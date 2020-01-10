import React from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Tabs , message } from "antd";
import { Auth , db } from "./config";
import { Redirect , Link } from "react-router-dom";

const { TabPane } = Tabs;

export default class EventParticipation extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      logoouttxt : "LOGOUT",
			disabled : false,
			redirect : false,
			primaryOneSlot1 : [],
			primaryOneSlot2 : [],
			primaryOneSlot3 : [],
			primaryTwoSlot1 : [],
			primaryTwoSlot2 : [],
			primaryTwoSlot3 : [],
			secondaryOneSlot1 : [],
			secondaryOneSlot2 : [],
			secondaryOneSlot3 : [],
			secondarySlot1 : [],
			secondarySlot2 : [],
			secondarySlot3 : []
    }
	}

	componentDidMount(){
		//fetching events.
		var that = this ;
		db.ref('events').child('primaryOne').child('slot1').on("value", function(data){
			let primaryOneSlot1 = []
			data.forEach(item => {
				let m = [];
				m = {
					eventCategory : item.val().eventCategory,
					eventCode : item.val().eventCode,
					eventDescription : item.val().eventDescription,
					eventName : item.val().eventName,
					indOrGroup : item.val().indOrGroup,
					maxNoPart : item.val().maxNoPart,
					Strict : item.val().Strict
				}
				primaryOneSlot1.push(m);
			})
			primaryOneSlot1!== null ? that.setState({primaryOneSlot1}) : null ;
		})

		db.ref('events').child('primaryOne').child('slot2').on("value", function(data){
			let primaryOneSlot2 = []
			data.forEach(item => {
				let m = [];
				m = {
					eventCategory : item.val().eventCategory,
					eventCode : item.val().eventCode,
					eventDescription : item.val().eventDescription,
					eventName : item.val().eventName,
					indOrGroup : item.val().indOrGroup,
					maxNoPart : item.val().maxNoPart,
					Strict : item.val().Strict
				}
				primaryOneSlot2.push(m);
			})
			primaryOneSlot2!== null ? that.setState({primaryOneSlot2}) : null ;
		})

		db.ref('events').child('primaryOne').child('slot3').on("value", function(data){
			let primaryOneSlot3 = []
			data.forEach(item => {
				let m = [];
				m = {
					eventCategory : item.val().eventCategory,
					eventCode : item.val().eventCode,
					eventDescription : item.val().eventDescription,
					eventName : item.val().eventName,
					indOrGroup : item.val().indOrGroup,
					maxNoPart : item.val().maxNoPart,
					Strict : item.val().Strict
				}
				primaryOneSlot3.push(m);
			})
			primaryOneSlot3!== null ? that.setState({primaryOneSlot3}) : null ;
		})

		db.ref('events').child('primaryTwo').child('slot1').on("value", function(data){
			let primaryTwoSlot1 = []
			data.forEach(item => {
				let m = [];
				m = {
					eventCategory : item.val().eventCategory,
					eventCode : item.val().eventCode,
					eventDescription : item.val().eventDescription,
					eventName : item.val().eventName,
					indOrGroup : item.val().indOrGroup,
					maxNoPart : item.val().maxNoPart,
					Strict : item.val().Strict
				}
				primaryTwoSlot1.push(m);
			})
			primaryTwoSlot1!== null ? that.setState({primaryTwoSlot1}) : null ;
		})

		db.ref('events').child('primaryTwo').child('slot2').on("value", function(data){
			let primaryTwoSlot2 = []
			data.forEach(item => {
				let m = [];
				m = {
					eventCategory : item.val().eventCategory,
					eventCode : item.val().eventCode,
					eventDescription : item.val().eventDescription,
					eventName : item.val().eventName,
					indOrGroup : item.val().indOrGroup,
					maxNoPart : item.val().maxNoPart,
					Strict : item.val().Strict
				}
				primaryTwoSlot2.push(m);
			})
			primaryTwoSlot2!== null ? that.setState({primaryTwoSlot2}) : null ;
		})

		db.ref('events').child('primaryTwo').child('slot3').on("value", function(data){
			let primaryTwoSlot3 = []
			data.forEach(item => {
				let m = [];
				m = {
					eventCategory : item.val().eventCategory,
					eventCode : item.val().eventCode,
					eventDescription : item.val().eventDescription,
					eventName : item.val().eventName,
					indOrGroup : item.val().indOrGroup,
					maxNoPart : item.val().maxNoPart,
					Strict : item.val().Strict
				}
				primaryTwoSlot3.push(m);
			})
			primaryTwoSlot3!== null ? that.setState({primaryTwoSlot3}) : null ;
		})

		db.ref('events').child('secondaryOne').child('slot1').on("value", function(data){
			let secondaryOneSlot1 = []
			data.forEach(item => {
				let m = [];
				m = {
					eventCategory : item.val().eventCategory,
					eventCode : item.val().eventCode,
					eventDescription : item.val().eventDescription,
					eventName : item.val().eventName,
					indOrGroup : item.val().indOrGroup,
					maxNoPart : item.val().maxNoPart,
					Strict : item.val().Strict
				}
				secondaryOneSlot1.push(m);
			})
			secondaryOneSlot1!== null ? that.setState({secondaryOneSlot1}) : null ;
		})

		db.ref('events').child('secondaryOne').child('slot2').on("value", function(data){
			let secondaryOneSlot2 = []
			data.forEach(item => {
				let m = [];
				m = {
					eventCategory : item.val().eventCategory,
					eventCode : item.val().eventCode,
					eventDescription : item.val().eventDescription,
					eventName : item.val().eventName,
					indOrGroup : item.val().indOrGroup,
					maxNoPart : item.val().maxNoPart,
					Strict : item.val().Strict
				}
				secondaryOneSlot2.push(m);
			})
			secondaryOneSlot2!== null ? that.setState({secondaryOneSlot2}) : null ;
		})

		db.ref('events').child('secondaryOne').child('slot3').on("value", function(data){
			let secondaryOneSlot3 = []
			data.forEach(item => {
				let m = [];
				m = {
					eventCategory : item.val().eventCategory,
					eventCode : item.val().eventCode,
					eventDescription : item.val().eventDescription,
					eventName : item.val().eventName,
					indOrGroup : item.val().indOrGroup,
					maxNoPart : item.val().maxNoPart,
					Strict : item.val().Strict
				}
				secondaryOneSlot3.push(m);
			})
			secondaryOneSlot3!== null ? that.setState({secondaryOneSlot3}) : null ;
		})

		db.ref('events').child('secondary').child('slot1').on("value", function(data){
			let secondarySlot1 = []
			data.forEach(item => {
				let m = [];
				m = {
					eventCategory : item.val().eventCategory,
					eventCode : item.val().eventCode,
					eventDescription : item.val().eventDescription,
					eventName : item.val().eventName,
					indOrGroup : item.val().indOrGroup,
					maxNoPart : item.val().maxNoPart,
					Strict : item.val().Strict
				}
				secondarySlot1.push(m);
			})
			secondarySlot1!== null ? that.setState({secondarySlot1}) : null ;
		})

		db.ref('events').child('secondary').child('slot2').on("value", function(data){
			let secondarySlot2 = []
			data.forEach(item => {
				let m = [];
				m = {
					eventCategory : item.val().eventCategory,
					eventCode : item.val().eventCode,
					eventDescription : item.val().eventDescription,
					eventName : item.val().eventName,
					indOrGroup : item.val().indOrGroup,
					maxNoPart : item.val().maxNoPart,
					Strict : item.val().Strict
				}
				secondarySlot2.push(m);
			})
			secondarySlot2!== null ? that.setState({secondarySlot2}) : null ;
		})

		db.ref('events').child('secondary').child('slot3').on("value", function(data){
			let secondarySlot3 = []
			data.forEach(item => {
				let m = [];
				m = {
					eventCategory : item.val().eventCategory,
					eventCode : item.val().eventCode,
					eventDescription : item.val().eventDescription,
					eventName : item.val().eventName,
					indOrGroup : item.val().indOrGroup,
					maxNoPart : item.val().maxNoPart,
					Strict : item.val().Strict
				}
				secondarySlot3.push(m);
			})
			secondarySlot3!== null ? that.setState({secondarySlot3}) : null ;
		})
	}


	
	callback(key) {
		console.log(key);
	}

  onLogoutclk(e){
		var that = this
		that.setState({logoutbtn:true})
		that.setState({logoouttxt:''})
		message.info('Admin Logged Out!');
		localStorage.removeItem('class');
		localStorage.removeItem('classCode');
		localStorage.removeItem('school');
		localStorage.removeItem('email');
		localStorage.removeItem('mobile');
		localStorage.removeItem('name');
		localStorage.removeItem('schoolCode');
		localStorage.removeItem('admin')
		this.setState({redirect : true})
	}

  render(){
    if(this.state.redirect === true){
      return <Redirect to="/" />
    }
    return(
      <div>
        <AppBar
        	style={{backgroundColor : "#fc7a57"}}
          title="Chennai Students Kondattam 2020"
          showMenuIconButton={false}
          iconElementRight={<FlatButton label={this.state.logoouttxt} disabled={this.state.logoutbtn} onClick={(this.onLogoutclk.bind(this))}/>}
        />
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          	<path fill="#fc7a57" fill-opacity="1" d="M0,32L120,37.3C240,43,480,53,720,64C960,75,1200,85,1320,90.7L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
        	</svg>
				<div style={{ margin : "10px" , marginTop : "-180px"}}>
					<h1>Events</h1>
					<Tabs defaultActiveKey="1" onChange={this.callback}>
    				<TabPane tab="Primary One" key="1">
      				<h4>Slot 1</h4>
								{this.state.primaryOneSlot1.map(item=>{
									<div>item.name</div>
								})}
							<h4>Slot 2</h4>
							{this.state.primaryOneSlot2.map(item=>{
									<div>item.name</div>
								})}
							<h4>Slot 3</h4>
							{this.state.primaryOneSlot3.map(item=>{
									<div>item.name</div>
								})}
    				</TabPane>
    				<TabPane tab="Primary Two" key="2">
							<h4>Slot 1</h4>
							{this.state.primaryTwoSlot1.map(item=>{
									<div>item.name</div>
								})}
							<h4>Slot 2</h4>
							{this.state.primaryTwoSlot2.map(item=>{
									<div>item.name</div>
								})}
							<h4>Slot 3</h4>
							{this.state.primaryTwoSlot3.map(item=>{
									<div>item.name</div>
								})}
    				</TabPane>
    				<TabPane tab="Secondary One" key="3">
							<h4>Slot 1</h4>
							{this.state.secondaryOneSlot1.map(item=>{
									<div>item.name</div>
								})}
							<h4>Slot 2</h4>
							{this.state.secondaryOneSlot2.map(item=>{
									<div>item.name</div>
								})}
							<h4>Slot 3</h4>
							{this.state.secondaryOneSlot3.map(item=>{
									<div>item.name</div>
								})}
    				</TabPane>
						<TabPane tab="Secondary Two" key="4">
							<h4>Slot 1</h4>
							{this.state.secondarySlot1.map(item=>{
									<div>item.name</div>
								})}
							<h4>Slot 2</h4>
							{this.state.secondarySlot2.map(item=>{
									<div>item.name</div>
								})}
							<h4>Slot 3</h4>
							{this.state.secondaryOneSlot3.map(item=>{
									<div>item.name</div>
								})}
    				</TabPane>
  				</Tabs>
				</div>
      </div>
    )
  }
}