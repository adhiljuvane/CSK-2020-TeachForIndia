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
        eventlistind:[],
        eventlistgrp:[],
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
    var that  = this
    Auth.onAuthStateChanged(function(user) {
      if (user) {
      if(user.uid != 'YeUxjWBjOJgVMdkQI7fWGEBwV5I2' && !that.state.admin){
        db.ref('users').child(user.uid).once('value').then(function(data){
          var who = data.val().branch
          that.setState({branchCodeView:data.val().branch , school : data.val().school , class : data.val().class})
        })
      }
      else{
        that.setState({adminView:true})
      }
      } 
      else {
    // No user is signed in.
      }
    });
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
onDetailsIndiv(inddata){
  this.setState({eventlistind:''})
  var eventlistind = []
  console.log("Ind",inddata);
for (var i = 0; i < inddata.length; i++) {
  db.ref('eventlist').child('Induvidual').child(inddata[i]).on('value',function(data){
      //console.log("data",child);
      var m = {
        key:inddata[i],
        id:data.val().id,
        name:data.val().name,
      }
      eventlistind.push(m)
      console.log("Vals", m);
  })
  this.setState({eventlistind})
}
}
onDetailsGrp(grpdata){
  this.setState({eventlistgrp:''})
  var eventlistgrp = []
  console.log("Grp",grpdata);
  for (var i = 0; i < grpdata.length; i++) {
    db.ref('eventlist').child('Group').child(grpdata[i]).on('value',function(data){

        //console.log("data",child);
        var m = {
          key:grpdata[i],
          id:data.val().id,
          name:data.val().name,

        }
        eventlistgrp.push(m)
        console.log("Vals", m);

    })
    this.setState({eventlistgrp})
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
  if ((this.state.eventlistind.length < 1) && (this.state.eventlistgrp.length < 1)) {
        message.info('Enter the Event Details or Press the Send Button in the Event list');
  }
  else if (this.state.partlist.length < 1) {
    message.info('Enter Particiant Details');
  }
  else {
    console.log("admin",this.state.adminView); //false if class teacher login.
if (this.state.adminView) {
  db.ref().child(this.state.partlist.school).child(this.state.partlist.class).child(this.state.partlist.reg).set({
    name:that.state.partlist.name,
    photo:that.state.partlist.img,
    regno:that.state.partlist.reg,
    class : that.state.partlist.class,
    school : that.state.partlist.school,
  })
  if (this.state.eventlistind.length >= 1) {
    db.ref().child(this.state.partlist.school).child(this.state.partlist.class).child(this.state.partlist.reg).child('events').child('individual').set({
      indlist:that.state.eventlistind
     })
  }
  else {
    db.ref().child(this.state.partlist.school).child(this.state.partlist.class).child(this.state.partlist.reg).child('events').child('individual').set({
      indlist:null
     })
  }
    if (this.state.eventlistgrp.length >= 1) {
      db.ref().child(this.state.partlist.school).child(this.state.partlist.class).child(this.state.partlist.reg).child('events').child('group').set({
        grplist:that.state.eventlistgrp
       })
    }
    else {
      db.ref().child(this.state.partlist.school).child(this.state.partlist.class).child(this.state.partlist.reg).child('events').child('group').set({
        grplist:null
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
else {
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
  if (this.state.eventlistind.length >= 1) {
    db.ref().child(this.state.partlist.schoolCode).child(this.state.partlist.classCode).child(this.state.partlist.reg).child('events').child('individual').set({
      indlist:that.state.eventlistind
     })
  }
  else {
    db.ref().child(this.state.partlist.schoolCode).child(this.state.partlist.classCode).child(this.state.partlist.reg).child('events').child('individual').set({
      indlist:null
     })
  }
  if (this.state.eventlistgrp.length >= 1) {
    db.ref().child(this.state.partlist.schoolCode).child(this.state.partlist.classCode).child(this.state.partlist.reg).child('events').child('group').set({
      grplist:that.state.eventlistgrp
     })
  }
  else {
    db.ref().child(this.state.partlist.schoolCode).child(this.state.partlist.classCode).child(this.state.partlist.reg).child('events').child('group').set({
      grplist:null
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
  db.ref(this.state.schoolCode).child(this.state.classCode).child(this.state.searchID).remove().then(function() {
      message.info('Participant Deleted');
      that.setState({togg:'View & Edit'})
      that.setState({view:false})
}).catch(function(error) {
  console.log("error",error)
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
        <Grid fluid='true' style={{ marginTop : "-170px"}}>
          <Toggle
            style={{ marginTop:10}}
            label={this.state.togg}
            labelPosition="right"
            onToggle={(this.ontogg.bind(this))}
          />
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
                  <Grid fluid='true'>
                    <Row className="show-grid">
                      <Col md={8} style={{marginTop:40}}>
                          <Card style={{width:'auto', heigh:'auto', textAlign:'center'}}>
                            <CardTitle title="Event List"/>
                            <Row className="show-grid">
                              <Col md={6}>
                                <h3>Individual Events</h3>
                                <EventList type="Induvidual" getDetails={this.onDetailsIndiv.bind(this)}/>
                              </Col>
                              <Col md={6}>
                                <h3>Group Events</h3>
                                <EventList type="Group" getDetails={this.onDetailsGrp.bind(this)} />
                              </Col>
                            </Row>
                            <br/><br />
                          </Card>
                      </Col>
                      <Col md={4} style={{marginTop:40}}>
                        <Card style={{width:'100%', heigh:'auto', textAlign:'center'}}>
                          <CardTitle title="Particiant Details"/>
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
                  <Grid  fluid='true'>
                    <Row className="show-grid">
                      <Col md={8} style={{marginTop:40}}>
                        <Card style={{width:'auto', heigh:'auto', textAlign:'center'}}>
                          <CardTitle title="Event List"/>
                          <Row className="show-grid">
                            <Col md={6}>
                              <h3>Individual Events</h3>
                              <EventListView type="individual" schoolCode={this.state.schoolCode} classCode={this.state.classCode} search={this.state.searchID} list="indlist" adminList={this.state.value}/>
                            </Col>
                            <Col md={6}>
                              <h3>Group Events</h3>
                              <EventListView type="group" schoolCode={this.state.schoolCode} classCode={this.state.classCode} search={this.state.searchID} list="grplist" adminList={this.state.value}/>
                            </Col>
                          </Row>
                          <br/><br/>
                        </Card>
                      </Col>
                      <Col md={4} style={{marginTop:40}}>
                        <Card style={{width:'auto', height:'auto', textAlign:'center'}}>
                          <CardTitle title="Particiant Details"/>
                          <PartDetailsUser id={this.state.searchID} schoolCode={this.state.schoolCode} classCode={this.state.classCode} adminList={this.state.value}/>
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
      <Grid >
       <Row className="show-grid">
         <Col md={12} style={{marginTop:40,marginLeft:'auto', width:'50%'}}>
            <Card style={{width:'auto', heigh:'auto', textAlign:'center'}}>
              <CardTitle title="LOGIN"/>
                <TextField floatingLabelText="User Name" type="email" onChange={this.onEnterUN.bind(this)}/><br /><br />
                <TextField floatingLabelText="Password" type="password" onChange={this.onEnterUP.bind(this)}/><br /><br />
                <RaisedButton label="Login" primary={true} onClick={this.onLogin.bind(this)} /><br /><br />
            </Card>
          </Col>
        </Row>
      </Grid>
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
