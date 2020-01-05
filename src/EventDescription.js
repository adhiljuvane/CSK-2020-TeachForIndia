import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { message } from "antd";

export default class EventDescription extends React.Component{
		constructor(props){
			super(props)
			this.state = {
				logoouttxt : 'LOGOUT',
				logoutbtn : true ,
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

    render(){
      return(
        <div>
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
					</div>
        </div>
      )
    }
}