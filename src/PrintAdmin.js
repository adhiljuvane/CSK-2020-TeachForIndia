import React from "react";
import { db } from "./config";
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import { message } from "antd";

export default class PrintAdmin extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data : [],
      schoolList : [ "CHEABM" , "CHEABG" , "CHEAAT" , "CHEAAN" , "CHEAAJ" , "CHEAAI" , "CHEAAF" , "CHEAAQ" , "CHEAAV" , "CHEAAY" , "CHEAAR" , "CHEAAM" , "CHEABA" , "CHEAAZ" , "CHEAAX" , "CHEABE" , "CHEABD" , "CHEAAU" , "CHEABI" , "CHEABJ" , "CHEAAL" , "CHEABK" , "CHEABL" , "CHEABF" , "CHEABH" , "CHEABN" , "CHEAAC"],
      class : [{ schoolCode : "CHEABM" , school : " Ambal.Mat. Hr. Sec. School" } , { schoolCode : "CHEABG" , school : "Anjuman Matriculation School"} , { schoolCode : "CHEAAT" , school : "CHS Kannamapet"} , { schoolCode : "CHEAAN" , school : "CHS Kottur"} , { schoolCode : "CHEAAJ" , school : "CHS McNichols"} , { schoolCode : "CHEAAI" , school : "CHS New Market Farm"} , { schoolCode : "CHEAAF" , school : "CHS TV Samy street"} , { schoolCode : "CHEAAQ" , school : "CHSS Koyambedu"} , { schoolCode : "CHEAAV" , school : "CHSS Puliyur"} , { schoolCode : "CHEAAY" , school : "CHSS TH Road"} , { schoolCode : "CHEAAR" , school : "CHSS Tharamani"} , { schoolCode : "CHEAAM" , school : "CHSS Thiruvanmiyur"} , { schoolCode : "CHEABA" , school : "CHSS Velachery"} , { schoolCode : "CHEAAZ" , school : "CMS Arumbakkam"} , { schoolCode : "CHEAAX" , school : "CMS MGR Nagar II"} , { schoolCode : "CHEABE" , school : "CMS MMDA I"} , { schoolCode : "CHEABD" , school : "CMS Pudumaniyakuppam"} , { schoolCode : "CHEAAU" , school : "CPS Goyyathope"} , { schoolCode : "CHEABI" , school : "CPS Kottur"} , { schoolCode : "CHEABJ" , school : "CPS McNichols"} , { schoolCode : "CHEAAL" , school : "CPS Rangarajapuram"} , { schoolCode : "CHEABK" , school : "CPS TH Road"} , { schoolCode : "CHEABL" , school : "CPS Tiruvanmiyur"} , { schoolCode : "CHEABF" , school : "CUMS Perambur Barracks Rd"}, { schoolCode : "CHEABH" , school : "RBANC School"} , { schoolCode : "CHEABN" , school : "Sri SBVR Memorial.Mat. School"} , { schoolCode : "CHEAAC" , school : "Vidyaniketan Matr. School"}]
    }
  }

  search = (nameKey, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].schoolCode === nameKey) {
            return myArray[i].school;
        }
    }
  }

  mobile = (number) => {
    db.ref('users').on("value", function(data){
      data.forEach( user => {
       // console.log("dd", user.val())
        if(user.val().mobile === number){
          console.log("lll", user.val().name)
          return user.val().name
        }
      })
    })
  }

  componentDidMount(){
    // console.log("ddd" , this.mobile("9387243797"));
    var that = this ;
    var vj_data = []
    let schoolList = this.state.schoolList ;
    schoolList.forEach(schoolCode => {
      db.ref(schoolCode).on("value" , function(data){
        data.forEach( classCode => {
          classCode.forEach( student => {
            let nam = that.mobile(student.val().mobile);
            var d = {
              name:student.val().name,
              photo:student.val().photo,
              regno:student.val().regno,
              events:student.val().events,
              class:classCode.key,
              school:that.search(schoolCode , that.state.class ),
              mobile : student.val().mobile,
              teacherInCharge : nam
            }
            vj_data.push(d)
            console.log(d);
          })
        })
        that.setState({data:vj_data})
      })
    })
  }

  render(){
    const items =[];
    const array = this.state.data
    console.log("array", array)
    for (var i = 0; i < array.length; i++) {
      items.push(
        <div className="IndIdCard" key={array[i].regno}>
          <div>
            <div style={{display : "flex" , width : "100%" , justifyContent : "center" , alignItems : "center" , fontSize : "45px"}}>Participant</div>
            <div style={{display : "flex" , width : "100%" , justifyContent : "center" , alignItems : "center" , fontSize : "25px"}}>Chennai Students Kondattam</div>
              <div style={{display : "flex" , flexDirection : "column" , justifyContent : "space-around" , marginBottom : "17px" , justifyContent : "center" , alignItems : "center"}}>
                <div style={{display : "flex" , alignItems :"center" ,  borderRadius : "150px"}}>
                  <img src={array[i].photo}  width="150px" height="150px" style={{ borderRadius : "150px"}}/>
                </div>
                <div style={{marginTop:10 , color : "#fff"}}>
                  <h5 style={{color : "#fff"}}>Name: {array[i].name}</h5>
                  <h5 id="regno"  style={{color : "#fff"}}>Roll No: {array[i].regno}</h5>
                  <h5 id="semester" style={{color : "#fff"}}>School: {array[i].school}</h5>
                  <h5 id="branch" style={{color : "#fff"}}>Class: {array[i].class}</h5>
                  <div style={{display : "flex" , flexDirection : "row" }}>
                    <h6 style={{color : "#fff"}}>Fellow Name : {array[i].teacherInCharge}</h6>
                    <h6 style={{color : "#fff"}}>Fellow Phone No : {array[i].mobile}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div style={{display : "flex" , flexDirection : "row" , justifyContent : "space-around" , width : "420px"}}>
                <div style={{marginBottom : "24px"}}>
                  <h4 style={{color : "#fff"}}>Slot1</h4>
                    {
                      array[i].events.eventListSlot1?
                       <li key={i} style={{listStyleType : "none"}}>{array[i].events.eventListSlot1.eventListSlot1.eventName}</li>
                  :null
                  }
                </div>
                <div>
                  <h4 style={{color : "#fff"}}>Slot 2</h4>
                {
                  array[i].events.eventListSlot2?
                  <li key={i} style={{listStyleType : "none"}}>{array[i].events.eventListSlot2.eventListSlot2.eventName}</li>
                  :null
                }
                </div>
                <div>
                  <h4 style={{color : "#fff"}}>Slot 3</h4>
                {
                  array[i].events.eventListSlot3?
                  <li key={i} style={{listStyleType : "none"}}>{array[i].events.eventListSlot3.eventListSlot3.eventName}</li>
                  :null
                }
                </div>
              </div>
            </div>
          </div>
        )
      }
    return(
        <div className="A3 landscape" >
          <section className="sheet padding-5mm" style={{margin:'auto'}}>
            <Grid  fluid={true}>
              {items.length !== 0 ? <Row  className="show-grid">{items}</Row> : message.warning("Add Students to generate Participant Cards.") }
            </Grid>
          </section>
        </div>
    )
  }
}