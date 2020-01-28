//script to make a participants list for each event in each slot.

import React from "react";
import { db , Auth } from "./config";

export default class Script extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      schoolList : [ "CHEABM" , "CHEABG" , "CHEAAT" , "CHEAAN" , "CHEAAJ" , "CHEAAI" , "CHEAAF" , "CHEAAQ" , "CHEAAV" , "CHEAAY" , "CHEAAR" , "CHEAAM" , "CHEABA" , "CHEAAZ" , "CHEAAX" , "CHEABE" , "CHEABD" , "CHEAAU" , "CHEABI" , "CHEABJ" , "CHEAAL" , "CHEABK" , "CHEABL" , "CHEABF" , "CHEABH" , "CHEABN" , "CHEAAC"],
      primaryOneSlot1 : [ "101" , "102" , "103" , "104" , "105" , "106" , "107" , "108" , "109" , "110" , "111" ],
      primaryOneSlot2 : [ "201" , "202" , "203" , "204" , "205" , "206" , "207" , "208" , "209" , "210" , "211" ],
      primaryOneSlot3 : [ "301" , "302" , "303" , "303" , "304" , "305" , "306" , "307" , "308" , "309" , "310" ],
      primaryTwoSlot1 : [ "101" , "102" , "103" , "104" , "105" , "106" , "107" , "108" , "109" , "110" , "111" , "112" , "113" , "114" ],
      primaryTwoSlot2 : [ "201" , "202" , "203" , "204" , "205" , "206" , "207" , "208" , "209" , "210" , "211" , "212" , "213" ],
      primaryTwoSlot3 : [ "301" , "302" , "303" , "303" , "304" , "305" , "306" , "307" , "308" , "309" , "310" , "311" ],
      secondaryOneSlot1 : [ "101" , "102" , "103" , "104" , "105" , "106" , "107" , "108" , "109" , "110" , "111" , "112" , "113" , "114" , "115" ],
      secondaryOneSlot2 : [ "200" , "201" , "202" , "203" , "204" , "205" , "206" , "207" , "208" , "209" , "210" , "211" , "212" , "213" , "214" , "215" , "216" ],
      secondaryOneSlot3 : [ "301" , "302" , "303" , "303" , "304" , "305" , "306" , "307" , "308" , "309" , "310" , "311" , "312" , "313" , "314" , "315" ],
      secondarySlot1 : [ "100" , "101" , "102" , "103" , "104" , "105" , "106" , "107" , "108" , "109" , "110" , "111" , "112" , "113" , "114" , "115" ],
      secondarySlot2 : [ "201" , "202" , "203" , "204" , "205" , "206" , "207" , "208" , "209" , "210" , "211" , "212" , "213" , "214" , "215" , "216" , "217" ],
      secondarySlot3 : [ "301" , "302" , "303" , "303" , "304" , "305" , "306" , "307" , "308" , "309" , "310" , "311" , "312" , "313" , "314" , "315" ],
      participantListP1S1 : [],
      participantListP1S2 : [],
      participantListP1S3 : [],
      participantListP2S1 : [],
      participantListP2S2 : [],
      participantListP2S3 : [],
      participantListS1S1 : [],
      participantListS1S2 : [],
      participantListS1S3 : [],
      participantListS2S1 : [],
      participantListS2S2 : [],
      participantListS2S3 : [],
    }
  }

  componentDidMount(){
    var that = this ;
    let schoolList = this.state.schoolList ;
    schoolList.forEach( schoolCode => {
      db.ref(schoolCode).on("value", function(data){
        data.forEach( classCode => {
          classCode.forEach( student => {
            let m = {}
            //findin sec
            let classes = parseInt(student.val().class);
            let sec = "";
            if(classes === 2 || classes === 3){
              sec = "primaryOne";
            }else if(classes === 4 || classes === 5){
              sec="primaryTwo";
            }else if(classes > 5){
              if(schoolCode === "CHEAAI" || schoolCode === "CHEAAF" || schoolCode === "CHEABA" || schoolCode === "CHEAAX" || schoolCode === "CHEABE" || schoolCode === "CHEABD"){
                sec = "secondaryOne";
              }else{
                sec = "secondary" ;
              }
            }
            m = {
              class : student.val().class,
              classCode : student.val().classCode,
              regno : student.val().regno,
              name : student.val().name,
              schoolCode : student.val().schoolCode
            }
            //console.log("mm",m)
            if(student.val().events.eventListSlot1 !== undefined){
              db.ref('eventStudentLists').child(sec).child('eventListSlot1').child(student.val().events.eventListSlot1.eventListSlot1.eventCode).push(m);
              //console.log("1" , sec , student.val().events.eventListSlot1.eventListSlot1.eventCode , m);
            }
            if(student.val().events.eventListSlot2 !== undefined){
              db.ref('eventStudentLists').child(sec).child('eventListSlot2').child(student.val().events.eventListSlot2.eventListSlot2.eventCode).push(m);
              //console.log("2" , sec , student.val().events.eventListSlot2.eventListSlot2.eventCode , m);
            }
            if(student.val().events.eventListSlot3 !== undefined){
              db.ref('eventStudentLists').child(sec).child('eventListSlot3').child(student.val().events.eventListSlot3.eventListSlot3.eventCode).push(m);
              //console.log("3" , sec , student.val().events.eventListSlot3.eventListSlot3.eventCode , m);
            }
          })
        })
      })
    })
  }

  render(){
    return(
      <div>
        dsdfsdfsdfsfsdfs
      </div>
    )
  }
}