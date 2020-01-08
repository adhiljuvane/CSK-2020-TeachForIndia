import React from 'react';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import { List, Button, message} from 'antd'
import backgroundImage from "./CSK2020.png";
import {Auth , db} from './config'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import "./Print.css"

export default class Print extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      data:[],
      classCode:'',
      schoolCode : '',
      school : '',
      class : '',
      admin:false,
      showPrint:false,
      classActive : true ,
      teacherInCharge : '',
      value:'',
      background:'../background.jpg',
    }

  }

componentDidMount(){
  var that  = this
  db.ref(localStorage.getItem('schoolCode')).child(localStorage.getItem('classCode')).on("value", function(data){
    if(data){
      that.setState({class : localStorage.getItem("class") , school : localStorage.getItem("school") , schoolCode : localStorage.getItem('schoolCode') , classCode : localStorage.getItem('classCode') , teacherInCharge : localStorage.getItem('name')});
    }
  })
}

  handleChange(e,index,value){
    console.log("val",value);
    this.setState({value});
  }

  print(){
    var that = this
    var vj_data = []
    if (this.state.class.length < 1) {
        message.info('Class Not Found');
    }
    else {
      db.ref(this.state.schoolCode).child(this.state.classCode).on('value',function(data){
        data.forEach(function(child){
          var d = {
            name:child.val().name,
            photo:child.val().photo,
            regno:child.val().regno,
            events:child.val().events,
            class:that.state.class,
            school:that.state.school,
            mobile : child.val().mobile,
            teacherInCharge : that.state.teacherInCharge
          }
          vj_data.push(d)
        })
        that.setState({data:vj_data})
      })
      this.setState({showPrint:true})
    }
  }

  printadmin(){
    var that = this
    var vj_data = []
      db.ref().child(this.state.value).on('value',function(data){
        data.forEach(function(child){
          var d = {
            name:child.val().name,
            photo:child.val().photo,
            regno:child.val().regno,
            sem:child.val().semester,
            events:child.val().events,
            branch:child.val().branch,
          }

          vj_data.push(d)

          console.log("eev",d.events);
        })
        that.setState({data:vj_data})
      })
      this.setState({showPrint:true})
  }

  render() {
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


  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ed6a5a" fillOpacity="1" d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,80C840,96,960,128,1080,128C1200,128,1320,96,1380,80L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      {this.state.showPrint?
          <div className="A3 landscape" >
          <section className="sheet padding-5mm" style={{margin:'auto'}}>
            <Grid  fluid={true}>
              {items.length !== 0 ? <Row  className="show-grid">{items}</Row> : null }
            </Grid>
          </section>
        </div>
      :
      <div>
        {this.state.admin?
          <div>
            <DropDownMenu
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
              style={{width:200}}
              autoWidth={false}
            >
              <MenuItem value="ARIES" primaryText="ARIES" />
              <MenuItem value="TAURUS" primaryText="TAURUS" />
              <MenuItem value="SAGITTARIUS" primaryText="SAGITTARIUS" />
              <MenuItem value="LEO" primaryText="LEO" />
              <MenuItem value="SCORPIONS" primaryText="SCORPIONS" />
              <MenuItem value="GEMINI" primaryText="GEMINI" />
              <MenuItem value="TEST" primaryText="TEST" />
            </DropDownMenu>
            <Button type="primary" shape="circle" icon="printer" size='large' onClick={this.printadmin.bind(this)}/>
          </div>
        :
          <div style={{marginTop : "-120px"}}>
            <div style={{marginLeft:30 , marginTop : 10}}>{this.state.school}</div>
            <TextField
              floatingLabelText="Class"
              disabled={this.state.classActive}
              value={this.state.class} style={{marginLeft:30}}
            />
            <Button type="primary" shape="circle" icon="printer" size='large' onClick={this.print.bind(this)}/>
          </div>}
      </div>}
    </div>
    );
  }
}
