import React, { Component } from 'react';
import { Auth , db } from "./config";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import {Card,CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Toggle from 'material-ui/Toggle';
import EventList from './EventList'
import Events from "./Events";
import EventListAdmin from './EventListAdmin'
import EventListGroup from './EventListGroup'
import PartDetails from './PartDetails'
import PartDetailsUser from './PartDetailsUser'
import RegDetails from './RegDetails'
import { Upload, Icon, message, Button, Radio, Popconfirm, Tooltip} from 'antd';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List/ListItem';
import EventListUser from './EventlistUser'
import EventListView from './EventListView'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link , Redirect } from 'react-router-dom'

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
        mode:false, // made true after login
        uname:'', //login username
        upass:'', //login password
        admin:false,
        adminView:false, // made true if admin is signed in
        logoutbtn:true, // to enable or disable logout btn in appbar made true when logged in
        logoouttxt:'',  // logout button text
        open:false,
        eventadd:false,
        togg:'View & Edit', // toggle button
        view:false,  // saved view // toggle button
        regview:false, //for admin
        flag:false,
        openModal:false,
        eventlistind:[],  //REMOVE
        eventlistgrp:[],   //REMOVE
        eventListSlot1 : [],
        eventListSlot2 : [],
        eventListSlot3 : [],
        partlist:[],
        school : '', // SCHOOL NAME
        schoolCode : '',
        class : '',
        branchCode:'',
        branchCodeView:'',//for viewing dont touch
        searchID:'',
        value:'',
    }
  }

  componentDidMount(){
    if(localStorage.getItem('email')){
      this.setState({mode : true , logoutbtn : false , logoouttxt : 'LOGOUT'})
    }
  }


onEnterUN(e, str){
    this.setState({uname:str})
}
onEnterUP(e, str){
    this.setState({upass:str})
}
onLogin(e){
  var that = this;
  if(this.state.uname === "anantharaman.g2018@teachforindia.org" && this.state.upass === "C$kadm!n"){
    localStorage.setItem("admin", true);
    this.setState({admin : true});
    message.config({
      top: 70,
      duration: 5,
    });
    message.info('Welcome Admin');
  }
  else{
    var that = this ;
    db.ref('users').on("value" , function(data){
      data.forEach(item => {
        if(item.val().email === that.state.uname && item.val().password === that.state.upass){
          that.setState({ logoutbtn : false , logoouttxt : 'LOGOUT' , flag : true , school : item.val().school , schoolCode :  item.val().schoolCode , class : item.val().class , classCode : item.val().classCode })
          message.config({
            top: 70,
            duration: 5,
          });
          message.info('Welcome '+item.val().name);
          localStorage.setItem("name" , item.val().name);
          localStorage.setItem("email" , item.val().email);
          localStorage.setItem("class" , item.val().class);
          localStorage.setItem("mobile" , item.val().mobile);
          localStorage.setItem("schoolCode" , item.val().schoolCode);
          localStorage.setItem("school" , item.val().school);
          localStorage.setItem("classCode", item.val().classCode);
          localStorage.setItem("admin", false);
          that.setState({ mode : true })
        }
      })
    })
  }
}
ontogg(e){
  if(!this.state.view){
    this.setState({togg:'Add'})
    this.setState({view:true})
  }
  else {
    this.setState({togg:'View & Edit'})
    this.setState({view:false})
  }
}
ontogg2(e){
      if((!this.state.regview) && this.state.flag && (this.state.uname == 'parvathikiran10@gmail.com')){
            this.setState({regview:true})
            this.setState({admin:true})
            console.log("In Regview");
      }
      else {
          this.setState({regview:false})
      }
}
onLogoutclk(e){
var that = this
    that.setState({logoutbtn:true})
    that.setState({logoouttxt:''})
    that.setState({mode:false})
    that.setState({uname:''})
    that.setState({upass:''})
    that.setState({admin:false})
    that.setState({flag:false})
    that.setState({regview:false})
    that.setState({eventlistind:[]})
    that.setState({eventlistgrp:[]})
    that.setState({partlist:[]})
    that.setState({searchID:''})
    that.setState({adminView:false})
    that.setState({view:false})
    that.setState({togg:'View & Edit'})
    message.info('Logged Out!');
    localStorage.removeItem('class');
    localStorage.removeItem('classCode');
    localStorage.removeItem('school');
    localStorage.removeItem('email');
    localStorage.removeItem('mobile');
    localStorage.removeItem('name');
    localStorage.removeItem('schoolCode');
}
snack(e){
  this.setState({open:false})
}


onDetails(data){
  this.setState({partlist:data})
  console.log("dataa",data);
}

onDetailsSlot1(slot1Data){
  this.setState({eventListSlot1 : ''})
  var eventListSlot1 = []
  let sec = "";
  let classes = parseInt(localStorage.getItem('class'));
  if(classes === 2 || classes === 3){
      sec = "primaryOne";
  }else if(classes === 4 || classes === 5){
      sec="primaryTwo";
  }else if(classes > 5){
    let schoolCode = localStorage.getItem('schoolCode');
    if(schoolCode === "CHEAAI" || schoolCode === "CHEAAF" || schoolCode === "CHEABA" || schoolCode === "CHEAAX" || schoolCode === "CHEABE" || schoolCode === "CHEABD"){
      sec = "secondaryOne";
    }else{
      sec = "secondary" ;
    }
  }
  console.log("secss",sec)
  for(var i = 0 ; i<slot1Data.length ; i++){
    db.ref('events').child(sec).child('slot1').child(slot1Data[i]).on('value',function(data){
      var m = {
        eventCategory : data.val().eventCategory,
        eventCode : data.val().eventCode,
        eventDescription : data.val().eventDescription,
        eventName : data.val().eventName,
        indOrGroup : data.val().indOrGroup,
        maxNoPart : data.val().maxNoPart,
        Strict : data.val().Strict,
        key : data.val().eventCode
      }
      eventListSlot1.push(m);
    })
    this.setState({eventListSlot1})
  }
}

onDetailsSlot2(slot2Data){
  this.setState({eventListSlot2 : ''})
  var eventListSlot2 = []
  let sec = "";
  let classes = parseInt(localStorage.getItem('class'));
  if(classes === 2 || classes === 3){
      sec = "primaryOne";
  }else if(classes === 4 || classes === 5){
      sec="primaryTwo";
  }else if(classes > 5){
    let schoolCode = localStorage.getItem('schoolCode');
    if(schoolCode === "CHEAAI" || schoolCode === "CHEAAF" || schoolCode === "CHEABA" || schoolCode === "CHEAAX" || schoolCode === "CHEABE" || schoolCode === "CHEABD"){
      sec = "secondaryOne";
    }else{
      sec = "secondary" ;
    }
  }
  for(var i = 0 ; i<slot2Data.length ; i++){
    db.ref('events').child(sec).child('slot2').child(slot2Data[i]).on('value',function(data){
      var m = {
        eventCategory : data.val().eventCategory,
        eventCode : data.val().eventCode,
        eventDescription : data.val().eventDescription,
        eventName : data.val().eventName,
        indOrGroup : data.val().indOrGroup,
        maxNoPart : data.val().maxNoPart,
        Strict : data.val().Strict,
        key : data.val().eventCode
      }
      eventListSlot2.push(m);
    })
    this.setState({eventListSlot2})
  }
}

onDetailsSlot3(slot3Data){
  this.setState({eventListSlot3 : ''})
  var eventListSlot3 = []
  let sec = "";
  let classes = parseInt(localStorage.getItem('class'));
  if(classes === 2 || classes === 3){
      sec = "primaryOne";
  }else if(classes === 4 || classes === 5){
      sec="primaryTwo";
  }else if(classes > 5){
    let schoolCode = localStorage.getItem('schoolCode');
    if(schoolCode === "CHEAAI" || schoolCode === "CHEAAF" || schoolCode === "CHEABA" || schoolCode === "CHEAAX" || schoolCode === "CHEABE" || schoolCode === "CHEABD"){
      sec = "secondaryOne";
    }else{
      sec = "secondary" ;
    }
  }
  for(var i = 0 ; i<slot3Data.length ; i++){
    db.ref('events').child(sec).child('slot3').child(slot3Data[i]).on('value',function(data){
      var m = {
        eventCategory : data.val().eventCategory,
        eventCode : data.val().eventCode,
        eventDescription : data.val().eventDescription,
        eventName : data.val().eventName,
        indOrGroup : data.val().indOrGroup,
        maxNoPart : data.val().maxNoPart,
        Strict : data.val().Strict,
        key : data.val().eventCode
      }
      eventListSlot3.push(m);
    })
    this.setState({eventListSlot3})
  }
}

clodemoda(){
  this.setState({openModal:false})
}

openmodal(){
  this.setState({openModal:true})
}

onSubSave(){
  var that = this
  if ((this.state.eventListSlot1.length !== 1) && (this.state.eventListSlot2.length !== 1) && (this.state.eventListSlot3.length !== 1)) {
      message.info('Every StudentMust participate in one and only one event from each slots.');
  }
  else if (this.state.partlist.length < 1) {
    message.info('Enter Particiant Details');
  }
  else {
if (this.state.adminView) {
  // db.ref().child(this.state.partlist.school).child(this.state.partlist.class).child(this.state.partlist.reg).set({
  //   name:that.state.partlist.name,
  //   photo:that.state.partlist.img,
  //   regno:that.state.partlist.reg,
  //   class : that.state.partlist.class,
  //   school : that.state.partlist.school,
  // })
  // if (this.state.eventlistind.length >= 1) {
  //   db.ref().child(this.state.partlist.school).child(this.state.partlist.class).child(this.state.partlist.reg).child('events').child('individual').set({
  //     indlist:that.state.eventlistind
  //    })
  // }
  // else {
  //   db.ref().child(this.state.partlist.school).child(this.state.partlist.class).child(this.state.partlist.reg).child('events').child('individual').set({
  //     indlist:null
  //    })
  // }
  //   if (this.state.eventlistgrp.length >= 1) {
  //     db.ref().child(this.state.partlist.school).child(this.state.partlist.class).child(this.state.partlist.reg).child('events').child('group').set({
  //       grplist:that.state.eventlistgrp
  //      })
  //   }
  //   else {
  //     db.ref().child(this.state.partlist.school).child(this.state.partlist.class).child(this.state.partlist.reg).child('events').child('group').set({
  //       grplist:null
  //      })
  //   }
  //    message.config({
  //    top: 70,
  //    duration: 5,
  //  });
  //            message.info('Data Insert Success');
  //            that.setState({eventlistind:[]})
  //            that.setState({eventlistgrp:[]})

}
else {
  let sec = "";
  let classes = parseInt(localStorage.getItem('class'));
  if(classes === 2 || classes === 3){
      sec = "primaryOne";
  }else if(classes === 4 || classes === 5){
      sec="primaryTwo";
  }else if(classes > 5){
    let schoolCode = localStorage.getItem('SchoolCode');
    if(schoolCode === "CHEAAI" || schoolCode === "CHEAAF" || schoolCode === "CHEABA" || schoolCode === "CHEAAX" || schoolCode === "CHEABE" || schoolCode === "CHEABD"){
      sec = "secondaryOne";
    }else{
      sec = "secondary" ;
    }
  }
  db.ref().child(this.state.partlist.schoolCode).child(this.state.partlist.classCode).child(this.state.partlist.reg).set({
    name:that.state.partlist.name,
    class:that.state.partlist.class,
    classCode : that.state.partlist.classCode,
    schoolCode : that.state.partlist.schoolCode,
    school:that.state.partlist.school,
    mobile:that.state.partlist.mobile,
    photo:that.state.partlist.img,
    regno:that.state.partlist.reg,
  })
  if (this.state.eventListSlot1.length >= 1) {
    db.ref(this.state.partlist.schoolCode).child(this.state.partlist.classCode).child(this.state.partlist.reg).child('events').child('eventListSlot1').set({
      eventListSlot1:that.state.eventListSlot1[0]
     })
    db.ref('eventStudentsList').child(sec).child('eventListSlot1').child(that.state.eventListSlot1[0].eventCode).push({
      name : that.state.partlist.name,
      class : that.state.partlist.class,
      classCode : that.state.partlist.classCode,
      schoolCode : that.state.partlist.schoolCode,
      regno : that.state.partlist.reg
    })
  }
  else {
    db.ref().child(this.state.partlist.schoolCode).child(this.state.partlist.classCode).child(this.state.partlist.reg).child('events').child('eventListSlot1').set({
      eventListSlot1:null
     })
  }
  if (this.state.eventListSlot2.length >= 1) {
    db.ref().child(this.state.partlist.schoolCode).child(this.state.partlist.classCode).child(this.state.partlist.reg).child('events').child('eventListSlot2').set({
      eventListSlot2:that.state.eventListSlot2[0]
     })
     db.ref('eventStudentsList').child(sec).child('eventListSlot2').child(that.state.eventListSlot2[0].eventCode).push({
      name : that.state.partlist.name,
      class : that.state.partlist.class,
      classCode : that.state.partlist.classCode,
      schoolCode : that.state.partlist.schoolCode,
      regno : that.state.partlist.reg
    })
  }
  else {
    db.ref().child(this.state.partlist.schoolCode).child(this.state.partlist.classCode).child(this.state.partlist.reg).child('events').child('eventListSlot2').set({
      eventListSlot2:null
     })
  }
  if (this.state.eventListSlot3.length >= 1) {
    db.ref().child(this.state.partlist.schoolCode).child(this.state.partlist.classCode).child(this.state.partlist.reg).child('events').child('eventListSlot3').set({
      eventListSlot3:that.state.eventListSlot3[0]
     })
     db.ref('eventStudentsList').child(sec).child('eventListSlot3').child(that.state.eventListSlot3[0].eventCode).push({
      name : that.state.partlist.name,
      class : that.state.partlist.class,
      classCode : that.state.partlist.classCode,
      schoolCode : that.state.partlist.schoolCode,
      regno : that.state.partlist.reg
    })
  }
  else {
    db.ref().child(this.state.partlist.schoolCode).child(this.state.partlist.classCode).child(this.state.partlist.reg).child('events').child('eventListSlot3').set({
      eventListSlot3:null
     })
  }
     message.config({
     top: 70,
     duration: 5,
   });
    message.info('Data Insert Success');
    that.setState({eventlistind:[]})
    that.setState({eventlistgrp:[]})
    }
  }
}

searchID(e,str){
  this.setState({searchID:str})
}

handleChangeBranchList(e,index,value){
  console.log("val",value);
  this.setState({value});
}

deletePart(){
if(this.state.searchID > 0){
  if (this.state.adminView) {
    db.ref(this.state.value).child(this.state.searchID).remove().then(function() {
          message.info('Participant Deleted');
  }).catch(function(error) {
    message.config({
    top: 70,
    duration: 5,
  });
    message.info('Participant Deleted Failed');
  });
  }
else {
  var that = this ;
  db.ref(localStorage.getItem('schoolCode')).child(localStorage.getItem('classCode')).child(this.state.searchID).remove().then(function() {
      message.info('Participant Deleted');
      that.setState({togg:'View & Edit'})
      that.setState({view:false})
}).catch(function(error) {
  message.config({
  top: 70,
  duration: 5,
});
  message.info('Participant Deleted Failed');
});
}
}
else {
  message.info('Enter SearchID');
}
}

  render(){
    if(this.state.admin === true){
      return <Redirect to="/admin"/>
    }
    const actions = [
         <FlatButton
           label="Cancel"
           primary={true}
           onClick={this.clodemoda.bind(this)}
         />,
         <FlatButton
           label="Submit"
           primary={true}
           disabled={true}
           onClick={this.handleClose}
         />,
           ];
    return(
      <div style={{height : "100vh"}}>
        <AppBar
          style={{backgroundColor : "#ed6a5a"}}
          title="Chennai Students Kondattam 2020"
          showMenuIconButton={false}
          iconElementRight={<FlatButton label={this.state.logoouttxt} disabled={this.state.logoutbtn} onClick={(this.onLogoutclk.bind(this))}/>}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ed6a5a" fillOpacity="1" d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,80C840,96,960,128,1080,128C1200,128,1320,96,1380,80L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      {this.state.mode?
        <Grid fluid={true} style={{ marginTop : "-170px"}}>
          <div style={{display : "flex" , flexDirection : "row" , justifyContent : "space-around" , alignItems : "center"}}>
            <Toggle
              style={{ marginTop:10 , width : "50%"}}
              label={this.state.togg}
              labelPosition="right"
              onToggle={(this.ontogg.bind(this))}
            />
            <Link to="/eventDescription"><div style={{marginRight : "15px" , width : "100px"}}>Event Details</div></Link>
          </div>
          <Row className="show-grid">
            <Col md={12} style={{marginTop:40}}>
              {!this.state.view?
                <Card style={{width:'auto', heigh:'auto', textAlign:'center'}}>
                  <CardTitle title="Participant Registration"/><br />
                  <Tooltip placement="right" title="Print">
                    <Link to='/print'>
                      <Button type="primary" shape="circle" icon="printer" size='large' />
                    </Link>
                  </Tooltip>
                  <Grid fluid={true}>
                    <Row className="show-grid">
                      <Col md={8} style={{marginTop:40}}>
                          <Card style={{width:'auto', heigh:'auto', textAlign:'center'}}>
                            <CardTitle title="Event List"/>
                            <Row className="show-grid">
                              <Col md={4}>
                                <h3>Slot 1 Events</h3>
                                <Events type="slot1" getDetails={this.onDetailsSlot1.bind(this)}/>
                              </Col>
                              <Col md={4}>
                                <h3>Slot 2 Events</h3>
                                <Events type="slot2" getDetails={this.onDetailsSlot2.bind(this)}/>
                              </Col>
                              <Col md={4}>
                                <h3>Slot 3 Events</h3>
                                <Events type="slot3" getDetails={this.onDetailsSlot3.bind(this)}/>
                              </Col>
                            </Row>
                            <br/><br />
                          </Card>
                      </Col>
                      <Col md={4} style={{marginTop:40}}>
                        <Card style={{width:'100%', heigh:'auto', textAlign:'center'}}>
                          <CardTitle title="Participant Details"/>
                          <PartDetails  getDetails={this.onDetails.bind(this)}/>
                        </Card>
                      </Col>
                    </Row>
                  </Grid>
                  <br/>
                  <RaisedButton label="Submit" secondary={true} onClick={this.onSubSave.bind(this)}/>
                  <br/><br/>
                </Card>
            :

                <Card style={{width:'auto', heigh:'auto', textAlign:'center'}}>
                  <CardTitle title="Participant View & Edit"/>
                  <TextField
                    floatingLabelText="Roll Number"
                    errorText="" onChange={this.searchID.bind(this)} />
                    {this.state.adminView?
                      <div>
                        <DropDownMenu
                          value={this.state.value}
                          onChange={this.handleChangeBranchList.bind(this)}
                          style={{width:200}}
                          autoWidth={false}
                        >
                          <MenuItem value="ARIES" primaryText="ARIES" />
                          <MenuItem value="TAURUS" primaryText="TAURUS" />
                          <MenuItem value="SAGITTARIUS" primaryText="SAGITTARIUS" />
                          <MenuItem value="LEO" primaryText="LEO" />
                          <MenuItem value="SCORPIONS" primaryText="SCORPIONS" />
                          <MenuItem value="GEMINI" primaryText="GEMINI" />
                        </DropDownMenu></div>
                    :
                      <div></div>}
                  <Grid  fluid={true}>
                    <Row className="show-grid">
                      <Col md={8} style={{marginTop:40}}>
                        <Card style={{width:'auto', heigh:'auto', textAlign:'center'}}>
                          <CardTitle title="Event List"/>
                          <Row className="show-grid">
                            <Col md={4}>
                              <h3>Slot 1</h3>
                              <EventListView type="eventListSlot1" schoolCode={localStorage.getItem('schoolCode')} classCode={localStorage.getItem('classCode')} search={this.state.searchID} adminList={this.state.value}/>
                            </Col>
                            <Col md={4}>
                              <h3>Slot 2</h3>
                              <EventListView type="eventListSlot2" schoolCode={localStorage.getItem('schoolCode')} classCode={localStorage.getItem('classCode')} search={this.state.searchID} adminList={this.state.value}/>
                            </Col>
                            <Col md={4}>
                              <h3>Slot 3</h3>
                              <EventListView type="eventListSlot3" schoolCode={localStorage.getItem('schoolCode')} classCode={localStorage.getItem('classCode')} search={this.state.searchID} adminList={this.state.value}/>
                            </Col>
                          </Row>
                          <br/><br/>
                        </Card>
                      </Col>
                      <Col md={4} style={{marginTop:40}}>
                        <Card style={{width:'auto', height:'auto', textAlign:'center'}}>
                          <CardTitle title="Particiant Details"/>
                          <PartDetailsUser id={this.state.searchID} schoolCode={localStorage.getItem('schoolCode')} classCode={localStorage.getItem('classCode')} adminList={this.state.value}/>
                        </Card>
                      </Col>
                    </Row>
                  </Grid>
                  <br/>
                  <Popconfirm placement="right" title="Are you sure you wanna delete this Participant?" onConfirm={this.deletePart.bind(this)} okText="Yes" cancelText="No">
                      <RaisedButton label="Delete Participant" secondary={true} />
                  </Popconfirm>
                  <br/><br/>
                </Card>
              }
            </Col>
          </Row>
          {this.state.uname == 'parvathikiran10@gmail.com'?
            <Grid  fluid='true'>
              <Toggle
                style={{marginTop:10}}
                label='Event & Caption Entery'
                labelPosition="right"
                onToggle={(this.ontogg2.bind(this))}
              />
              <Row className="show-grid">
                <Col md={12} style={{marginTop:40}}>
                  {this.state.regview?
                    <RegDetails emailRe={this.state.uname} passRe={this.state.upass}/>
                  :
                    <div></div>}
                </Col>
              </Row>
            </Grid>
          :
            <div></div>
          }
      </Grid>
      :
      <div style={{display : "flex" , flexDirection : "column" , justifyContent : "space-between" , marginTop : "-60px"}}>
      <div style={{display : "flex" , alignItems : "center" , justifyContent : "center"}}>
       <div style={{width : "100%" , display : "flex" , alignItems : "center" , justifyContent : "center"}}>
         <div style={{width:'50%'}}>
            <Card style={{width:'auto', height:'auto', textAlign:'center'}}>
              <CardTitle title="LOGIN"/>
                <TextField floatingLabelText="User Name" type="email" onChange={this.onEnterUN.bind(this)}/><br /><br />
                <TextField floatingLabelText="Password" type="password" onChange={this.onEnterUP.bind(this)}/><br /><br />
                <RaisedButton label="Login" primary={true} onClick={this.onLogin.bind(this)} /><br /><br />
            </Card>
          </div>
        </div>
      </div>
      </div>
    }

    <Snackbar
   open={this.state.open}
   message="Login Failed!!"
   autoHideDuration={4000}
   onRequestClose={this.snack.bind(this)}
   />
  </div>
    )
  }
}
export default Home
