import React from 'react';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import {List, Button, message} from 'antd'
import backgroundImage from "./CSK2020.png";
import {Auth , db} from './config'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

export default class Print extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      data:[],
      branchCode:'',
      school : '',
      class : '',
      admin:false,
      showPrint:false,
      branchActive:true,
      teacherInCharge : '',
      value:'',
      background:'../background.jpg',
    }

  }

componentDidMount(){
  var that  = this
  Auth.onAuthStateChanged(function(user) {
    if (user) {
      if(user.uid != 'vT00GEdpnKTuXiZlvAF2KJFgZ1j1' && !that.state.admin){
        db.ref('users').child(user.uid).once('value').then(function(data){
          that.setState({branchCode:data.val().branch , school : data.val().school , class : data.val().class , teacherInCharge : data.val().name})
        })
      }
      else{
        that.setState({admin:true})
        that.setState({branchCode:''})
      }
  } else {
    // No user is signed in.
  }
});
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
      db.ref().child(this.state.school).child(this.state.class).on('value',function(data){
        data.forEach(function(child){
          var d = {
            name:child.val().name,
            photo:child.val().photo,
            regno:child.val().regno,
            events:child.val().events,
            class:that.state.class,
            school:that.state.school,
            teacherInCharge : that.state.teacherInCharge
          }
          vj_data.push(d)
          console.log("eev",d.events);
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
    for (var i = 0; i < array.length; i++) {
      items.push(
        <div className="IndIdCard" style={{ border:1, borderStyle:'dashed', padding:30, height:550, width:420 , backgroundImage: `url(${backgroundImage})`, backgroundSize: '450px' , backgroundRepeat : "no-repeat" , backgroundPosition : "center" }}>
          <div>
            <div style={{display : "flex" , width : "100%" , justifyContent : "center" , alignItems : "center" , fontSize : "45px"}}>Participant</div>
            <div style={{display : "flex" , flexDirection : "row" , justifyContent : "space-around" , marginBottom : "17px"}}>
              <div style={{display : "flex" , alignItems :"center"}}><img src={array[i].photo}  width="150px" height="150px" /></div>
              <div style={{marginTop:10}}>
                <h5>Name: {array[i].name}</h5>
                <h5 id="regno">Roll No: {array[i].regno}</h5>
                <h5 id="semester">School: {array[i].school}</h5>
                <h5 id="branch">Class: {array[i].class}</h5>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div style={{marginBottom : "24px"}}>
                <h4>Individual</h4>
                  {
                    array[i].events.individual!=null?
                    array[i].events.individual.indlist.map((item,i) => <li key={i}>{item.name}</li>)
                :null
                }
              </div>
              <div>
                <h4>Group</h4>
              {
                array[i].events.group!=null?
                array[i].events.group.grplist.map((item,i) => <li key={i}>{item.name}</li>)
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
      {this.state.showPrint?
        <div className="A3 landscape" >
          <section className="sheet padding-5mm" style={{margin:'auto'}}>
            <Grid  fluid='true'>
              <Row  className="show-grid">{items}</Row>
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
          <div>
            <div style={{marginLeft:30 , marginTop : 10}}>{this.state.school}</div>
            <TextField
              floatingLabelText="Class"
              disabled={this.state.branchActive}
              value={this.state.class} style={{marginLeft:30}}
            />
            <Button type="primary" shape="circle" icon="printer" size='large' onClick={this.print.bind(this)}/>
          </div>}
      </div>}
    </div>
    );
  }
}
