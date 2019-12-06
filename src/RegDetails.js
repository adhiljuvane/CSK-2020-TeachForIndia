import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {Card,CardTitle} from 'material-ui/Card';
import EventList from './EventListAdmin';
import EventListGroup from './EventListGroup';
import PartDetails from './PartDetails';
import Toggle from 'material-ui/Toggle';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {db , Auth} from './config'
import {message} from 'antd';

export default class RegDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "Individual",
      evID:'',
      evName:'',
      email:'',
      pass:'',
      regno:'',
      pname:'',
      branch:'',
      uid:'',
      error:'',

    };
  }

  emailChange(e,str){
    this.setState({email:str})
  }
  passChange(e,str){
    this.setState({pass:str})
  }

  regChange(e,str){
    this.setState({regno:str})
  }
  pnameChange(e,str){
    this.setState({pname:str})
  }
  regClick(e){
    var that = this;
    Auth.createUserWithEmailAndPassword(this.state.email, this.state.pass).then(function(data){

      db.ref().child('users').child(data.uid).set({
        branch:that.state.branch,
        regno:that.state.regno,
        name:that.state.pname
       })
       message.info('Caption Registered');
       Auth.signInWithEmailAndPassword(that.props.emailRe, that.props.passRe).then(function(data){
         message.config({
         top: 70,
         duration: 5,
       });
        message.info('Welcome '+data.val().name);
        }).catch(function(error) {

         });

    })




  }

  handleChange(e,index,value){
    console.log("val",value);
    this.setState({value});
  }

  handleChangeBranchCode(e,index,value){
    console.log("val",value);
    this.setState({branch:value});
  }

  idChange(e,str){
    this.setState({evID:str})
  }

  nameChange(e,str){
    this.setState({evName:str})
  }

  onAdd(){
    if (this.state.evID == '' || this.state.evName=='') {
      this.setState({error:'Please Fill This'})
    }
    else{
    var data = {
      type:this.state.value,
      id:this.state.evID,
      name:this.state.evName
    }
    db.ref().child('eventlist').child(this.state.value).push(data)
      this.setState({error:'Please Fill This'})
    this.setState({evID:''})
    this.setState({evName:''})
  }
  }


render() {

  return (
<div>

          <Card style={{width:'auto', heigh:'auto', textAlign:'center'}}>
          <CardTitle title="Event & Admin Registration"/>

            <Grid  fluid='true'>

             <Row className="show-grid">
               <Col md={8} style={{marginTop:40}}>

                      <Card style={{width:'auto', heigh:'auto', textAlign:'center'}}>
                      <CardTitle title="Event List"/>
                        <Row className="show-grid">
                          <Col md={6}>
                            <h3>Individual Events</h3>
                      <EventList type="Individual" />  </Col>
                        <Col md={6}>
                            <h3>Group Events</h3>
                    <EventList type="Group" />
                    </Col>
                  </Row>
                       <br />
                       <div >
                        <Grid  fluid='true'>

                         <Row className="show-grid">
                           <Col md={6} xsOffset={3}>
                               <h2 style={{textAlign:'center'}}>Event Entry</h2>
                              <TextField
                                onChange={this.idChange.bind(this)}
                                 floatingLabelText="Event ID"
                                 errorText={this.state.error} />
                                 <TextField
                                   onChange={this.nameChange.bind(this)}
                                    floatingLabelText="Event Name"
                                    errorText={this.state.error}/><br />
                                    <DropDownMenu
                                      value={this.state.value}
                                      onChange={this.handleChange.bind(this)}
                                      style={{width:200}}
                                      autoWidth={false}
                                    >
                                      <MenuItem value="Individual" primaryText="Individual Event" />
                                      <MenuItem value="Group" primaryText="Group Event" />
                                    </DropDownMenu><br />
                                  <RaisedButton label="Submit" secondary={true} onClick={this.onAdd.bind(this)}/>
                                  </Col>
                                   </Row>
                                 </Grid>
                          </div>



                  <br /><br />
                    </Card>
                  </Col>
                  <Col md={4} style={{marginTop:40}}>

                         <Card style={{width:'100%', heigh:'auto', textAlign:'center'}}>
                         <CardTitle title="Captain Entry"/>

                           <div>
                                 <TextField
                                    floatingLabelText="Registration No#"
                                    errorText="" onChange={this.regChange.bind(this)}/><br /><br />
                                    <TextField
                                       floatingLabelText="Name"
                                       errorText="" onChange={this.pnameChange.bind(this)}/><br /><br />
                                    <TextField
                                       floatingLabelText="Email"
                                       errorText="" type="email" onChange={this.emailChange.bind(this)}/><br /><br />
                                       <TextField
                                          floatingLabelText="Password"
                                          errorText="" onChange={this.passChange.bind(this)}/><br /><br />
                                          <h5>BranchCode</h5>
                                          <DropDownMenu
                                            value={this.state.branch}
                                            onChange={this.handleChangeBranchCode.bind(this)}
                                            style={{width:200}}
                                            autoWidth={false}
                                          >
                                            <MenuItem value="ARIES" primaryText="ARIES" />
                                            <MenuItem value="TAURUS" primaryText="TAURUS" />
                                            <MenuItem value="SAGITTARIUS" primaryText="SAGITTARIUS" />
                                            <MenuItem value="LEO" primaryText="LEO" />
                                            <MenuItem value="SCORPIONS" primaryText="SCORPIONS" />
                                            <MenuItem value="GEMINI" primaryText="GEMINI" />
                                          </DropDownMenu><br /><br />
                                       <div style={{width:'22%',margin:'auto'}}>
                                       </div>
                                        <RaisedButton label="Submit" secondary={true}
                                          onClick={this.regClick.bind(this)}/><br /><br />
                           </div>

                       </Card>
                     </Col>
                      </Row>
                    </Grid>
                    <br />

               <br /><br />
          </Card>
          :
          <div></div>
      }

</div>
  );
}
}
