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
			secondarySlot3 : [],
			studentsList : [],
			eventParticipation : false
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
			that.setState({primaryOneSlot1})
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
			that.setState({primaryOneSlot2})
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
			that.setState({primaryOneSlot3})
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
			that.setState({primaryTwoSlot1})
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
			that.setState({primaryTwoSlot2})
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
			that.setState({primaryTwoSlot3})
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
			that.setState({secondaryOneSlot1})
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
			that.setState({secondaryOneSlot2})
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
			that.setState({secondaryOneSlot3})
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
			that.setState({secondarySlot1})
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
			that.setState({secondarySlot2})
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
			that.setState({secondarySlot3})
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

	onEventClick = (eventCode , slot , sec) => {
		console.log("eventCode" , eventCode , "sec" , sec , "slot" , slot )
		var that = this ;
		let studentsList = [];
		db.ref('eventStudentLists').child(sec).child(slot).child(eventCode).on("value" , function(data){
			console.log("dat",data.val())
			data.forEach(item => {
				let student = {
					class : item.val().class,
					classCode : item.val().classCode,
					name : item.val().name,
					regno : item.val().regno,
					schoolCode: item.val().schoolCode,
				}
				studentsList.push(student);
			})
			that.setState({studentsList , eventParticipation : true})
			console.log("studentsList",studentsList)
		})
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
				{this.state.eventParticipation? 
					<div style={{ margin : "10px" , marginTop : "-180px"}}>
						<h2>Participants :</h2>
						<div style={{width : "50%" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
								<div style={{width : "20%" ,display : "flex" , justifyContent : "center" , alignItems : "center"}}>Name</div>
								<div style={{width : "20%" ,display : "flex" , justifyContent : "center" , alignItems : "center"}}>Class</div>
								<div style={{width : "20%" ,display : "flex" , justifyContent : "center" , alignItems : "center"}}>Class Code</div>
								<div style={{width : "20%" ,display : "flex" , justifyContent : "center" , alignItems : "center"}}>Reg No:</div>
								<div style={{width : "20%" ,display : "flex" , justifyContent : "center" , alignItems : "center"}}>School Code</div>
							</div>
						{this.state.studentsList.map(item => {
							return <div style={{width : "50%" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
								<div style={{width : "20%" ,display : "flex" , justifyContent : "center" , alignItems : "center"}}>{item.name}</div>
								<div style={{width : "20%" ,display : "flex" , justifyContent : "center" , alignItems : "center"}}>{item.class}</div>
								<div style={{width : "20%" ,display : "flex" , justifyContent : "center" , alignItems : "center"}}>{item.classCode}</div>
								<div style={{width : "20%" ,display : "flex" , justifyContent : "center" , alignItems : "center"}}>{item.regno}</div>
								<div style={{width : "20%" ,display : "flex" , justifyContent : "center" , alignItems : "center"}}>{item.schoolCode}</div>
							</div>
						})}
					</div>
				: <div style={{ margin : "10px" , marginTop : "-180px"}}>
					<h1>Events</h1>
					<Tabs defaultActiveKey="1" onChange={this.callback}>
    				<TabPane tab="Primary One" key="1">
      				<h4>Slot 1</h4>
								{this.state.primaryOneSlot1.map(item=>{
									return 	<div onClick={() => this.onEventClick(item.eventCode , "eventListSlot1" , "primaryOne")} style={{ width : "300px" , margin : "10px" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
														<div>{item.eventName}</div>
														<div>{item.eventCode}</div>
													</div>
								})}
							<h4>Slot 2</h4>
							{this.state.primaryOneSlot2.map(item=>{
									return 	<div onClick={() => this.onEventClick(item.eventCode , "eventListSlot2" , "primaryOne")} style={{ width : "300px" , margin : "10px" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
														<div>{item.eventName}</div>
														<div>{item.eventCode}</div>
													</div>
								})}
							<h4>Slot 3</h4>
							{this.state.primaryOneSlot3.map(item=>{
									return 	<div onClick={() => this.onEventClick(item.eventCode , "eventListSlot3" , "primaryOne")} style={{ width : "300px" , margin : "10px" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
														<div>{item.eventName}</div>
														<div>{item.eventCode}</div>
													</div>
								})}
    				</TabPane>
    				<TabPane tab="Primary Two" key="2">
							<h4>Slot 1</h4>
							{this.state.primaryTwoSlot1.map(item=>{
									return 	<div onClick={() => this.onEventClick(item.eventCode , "eventListSlot1" , "primaryTwo")} style={{ width : "300px" , margin : "10px" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
														<div>{item.eventName}</div>
														<div>{item.eventCode}</div>
													</div>
								})}
							<h4>Slot 2</h4>
							{this.state.primaryTwoSlot2.map(item=>{
									return 	<div onClick={() => this.onEventClick(item.eventCode , "eventListSlot2" , "primaryTwo")} style={{ width : "300px" , margin : "10px" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
														<div>{item.eventName}</div>
														<div>{item.eventCode}</div>
													</div>
								})}
							<h4>Slot 3</h4>
							{this.state.primaryTwoSlot3.map(item=>{
									return 	<div onClick={() => this.onEventClick(item.eventCode , "eventListSlot3" , "primaryTwo")} style={{ width : "300px" , margin : "10px" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
														<div>{item.eventName}</div>
														<div>{item.eventCode}</div>
													</div>
								})}
    				</TabPane>
    				<TabPane tab="Secondary One" key="3">
							<h4>Slot 1</h4>
							{this.state.secondaryOneSlot1.map(item=>{
									return 	<div onClick={() => this.onEventClick(item.eventCode , "eventListSlot1" , "secondaryOne")} style={{ width : "300px" , margin : "10px" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
														<div>{item.eventName}</div>
														<div>{item.eventCode}</div>
													</div>
								})}
							<h4>Slot 2</h4>
							{this.state.secondaryOneSlot2.map(item=>{
									return 	<div onClick={() => this.onEventClick(item.eventCode , "eventListSlot2" , "secondaryOne")} style={{ width : "300px" , margin : "10px" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
														<div>{item.eventName}</div>
														<div>{item.eventCode}</div>
													</div>
								})}
							<h4>Slot 3</h4>
							{this.state.secondaryOneSlot3.map(item=>{
									return 	<div onClick={() => this.onEventClick(item.eventCode , "eventListSlot3" , "secondaryOne")} style={{ width : "300px" , margin : "10px" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
														<div>{item.eventName}</div>
														<div>{item.eventCode}</div>
													</div>
								})}
    				</TabPane>
						<TabPane tab="Secondary Two" key="4">
							<h4>Slot 1</h4>
							{this.state.secondarySlot1.map(item=>{
									return 	<div onClick={() => this.onEventClick(item.eventCode , "eventListSlot1" , "secondary")} style={{ width : "300px" , margin : "10px" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
														<div>{item.eventName}</div>
														<div>{item.eventCode}</div>
													</div>
								})}
							<h4>Slot 2</h4>
							{this.state.secondarySlot2.map(item=>{
									return 	<div onClick={() => this.onEventClick(item.eventCode , "eventListSlot2" , "secondary")} style={{ width : "300px" , margin : "10px" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
														<div>{item.eventName}</div>
														<div>{item.eventCode}</div>
													</div>
								})}
							<h4>Slot 3</h4>
							{this.state.secondaryOneSlot3.map(item=>{
									return 	<div onClick={() => this.onEventClick(item.eventCode , "eventListSlot3" , "secondary")} style={{ width : "300px" , margin : "10px" , display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
														<div>{item.eventName}</div>
														<div>{item.eventCode}</div>
													</div>
								})}
    				</TabPane>
  				</Tabs>
				</div>}
      </div>
    )
  }
}