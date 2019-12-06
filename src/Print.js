import React from 'react';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import {List, Button, message} from 'antd'
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
          that.setState({branchCode:data.val().branch , school : data.val().school , class : data.val().class})
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
    if (this.state.branchCode.length < 1) {
        message.info('BranchCode Not Found');
    }
    else {
      db.ref().child(this.state.school).child(this.state.class).on('value',function(data){
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
        <Col md={4} style={{border:1,borderStyle:'dashed',padding:50,height:550,backgroundImage: `url(${this.state.background})`,backgroundSize: 'cover'}}>
          <div>
          <Row>
            <Col sm={5}>
              <img src={array[i].photo}  width="100px" height="100px" />
            </Col>
            <Col sm={7} style={{marginTop:10}}>
              <h5>Name: {array[i].name}</h5>
              <h5 id="regno">RegNo: {array[i].regno}</h5>
              <h5 id="semester">Semester: {array[i].sem}</h5>
              <h5 id="branch">Branch: {array[i].branch}</h5>
            </Col>

          </Row>
          </div>
          <div>
            <Row>
              <Col sm={6} heigh="30px">
                <h4>Individual</h4>
                  {
                    array[i].events.individual!=null?
                    array[i].events.individual.indlist.map((item,i) => <li key={i}>{item.name}</li>)
                :null
                }
              </Col>
              <Col sm={6} heigh="30px">
                <h4>Group</h4>
              {
                array[i].events.group!=null?
                array[i].events.group.grplist.map((item,i) => <li key={i}>{item.name}</li>)
                :null
              }
              </Col>
            </Row>
          </div>
        </Col>

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
            <TextField
              floatingLabelText="Branch"
              disabled={this.state.branchActive}
              value={this.state.branchCode} style={{marginLeft:30}}
            />
            <Button type="primary" shape="circle" icon="printer" size='large' onClick={this.print.bind(this)}/>
          </div>}
      </div>}
    </div>
    );
  }
}
