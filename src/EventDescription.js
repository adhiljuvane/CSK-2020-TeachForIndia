import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { message , Table, Divider, Tag} from "antd";
import { db } from "./config";

const { Column, ColumnGroup } = Table;

export default class EventDescription extends React.Component{
		constructor(props){
			super(props)
			this.state = {
				logoouttxt : 'LOGOUT',
				logoutbtn : true ,
				eventListSlot1 : [],
				eventListSlot2 : [],
				eventListSlot3 : [],
			}
		}

		componentDidMount(){
			let sec = "";
			var that = this;
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
			db.ref('events').child(sec).child('slot1').on("value", function(data){
				let eventListSlot1 = [];
				data.forEach( item => {
					var m = {
						eventCategory : item.val().eventCategory,
						eventCode : item.val().eventCode,
						eventDescription : item.val().eventDescription,
						eventName : item.val().eventName,
						indOrGroup : item.val().indOrGroup,
						maxNoPart : item.val().maxNoPart,
						Strict : item.val().Strict,
					}
					eventListSlot1.push(m);
				})
				that.setState({eventListSlot1 : eventListSlot1});
			})

			let eventListSlot2 = [];
			db.ref('events').child(sec).child('slot2').on("value", function(data){
				let eventListSlot2 = [];
				data.forEach( item => {
					var m = {
						eventCategory : item.val().eventCategory,
						eventCode : item.val().eventCode,
						eventDescription : item.val().eventDescription,
						eventName : item.val().eventName,
						indOrGroup : item.val().indOrGroup,
						maxNoPart : item.val().maxNoPart,
						Strict : item.val().Strict,
					}
					eventListSlot2.push(m);
				})
				that.setState({eventListSlot2 : eventListSlot2});
			})

			let eventListSlot3 = [];
			db.ref('events').child(sec).child('slot3').on("value", function(data){
				let eventListSlot3 = [];
				data.forEach( item => {
					var m = {
						eventCategory : item.val().eventCategory,
						eventCode : item.val().eventCode,
						eventDescription : item.val().eventDescription,
						eventName : item.val().eventName,
						indOrGroup : item.val().indOrGroup,
						maxNoPart : item.val().maxNoPart,
						Strict : item.val().Strict,
					}
					eventListSlot3.push(m);
				})
				that.setState({eventListSlot3 : eventListSlot3});
			})

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

    render(){
      return(
        <div style={{display : "flex" , flexDirection : "column" , alignItems : "center"}}>
          <AppBar
            style={{backgroundColor : "#0099ff"}}
            title="Chennai Students Kondattam 2020"
          	showMenuIconButton={false}
          	iconElementRight={<FlatButton label={this.state.logoouttxt} disabled={this.state.logoutbtn} onClick={(this.onLogoutclk.bind(this))}/>}
        	/>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
						<path fill="#0099ff" fill-opacity="1" d="M0,128L80,138.7C160,149,320,171,480,154.7C640,139,800,85,960,64C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
					</svg>
					<div style={{marginTop : "-100px" , marginLeft : "5px" , marginRight : "5px"}}>
						<h1>Event Details :</h1>
						<div style={{margin : "5px"}}>
							<h3>Slot1 -> 9:30AM - 11:00AM</h3>
							<Table dataSource={this.state.eventListSlot1} pagination={false}>
								<Column title="Event Code" dataIndex="eventCode" key="eventCode" />
								<Column title="Event Name" dataIndex="eventName" key="eventName" />
								<Column title="Event Category" dataIndex="eventCategory" key="eventCategory" />
								<Column title="Event Description" dataIndex="eventDescription" key="eventDescription" />
								<Column title="Ind/Group" dataIndex="indOrGroup" key="indOrGroup" />
								<Column title="Max No: Of Participants" dataIndex="maxNoPart" key="maxNoPart" />
							</Table>
						</div>
						<div style={{margin : "5px" , marginTop : "10px"}}>
							<h3>Slot2 -> 11:15AM - 12:4PM</h3>
							<Table dataSource={this.state.eventListSlot2} pagination={false}>
								<Column title="Event Code" dataIndex="eventCode" key="eventCode" />
								<Column title="Event Name" dataIndex="eventName" key="eventName" />
								<Column title="Event Category" dataIndex="eventCategory" key="eventCategory" />
								<Column title="Event Description" dataIndex="eventDescription" key="eventDescription" />
								<Column title="Ind/Group" dataIndex="indOrGroup" key="indOrGroup" />
								<Column title="Max No: Of Participants" dataIndex="maxNoPart" key="maxNoPart" />
							</Table>
						</div>
						<div style={{margin : "5px" , marginTop : "10px"}}>
							<h3>Slot3 -> 2:00PM - 3:30PM</h3>
							<Table dataSource={this.state.eventListSlot2} pagination={false}>
								<Column title="Event Code" dataIndex="eventCode" key="eventCode" />
								<Column title="Event Name" dataIndex="eventName" key="eventName" />
								<Column title="Event Category" dataIndex="eventCategory" key="eventCategory" />
								<Column title="Event Description" dataIndex="eventDescription" key="eventDescription" />
								<Column title="Ind/Group" dataIndex="indOrGroup" key="indOrGroup" />
								<Column title="Max No: Of Participants" dataIndex="maxNoPart" key="maxNoPart" />
							</Table>
						</div>
					</div>
        </div>
      )
    }
}