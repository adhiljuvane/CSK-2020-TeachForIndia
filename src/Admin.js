import React from "react"
import "./Admin.css";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { message } from "antd";

export default class Admin extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			logoouttxt : "LOGOUT",
			disabled : false,

		}
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
		}

    render(){
        return(
            <div>
              <AppBar
                style={{backgroundColor : "#f7717d"}}
                title="Chennai Students Kondattam 2020"
                showMenuIconButton={false}
                iconElementRight={<FlatButton label={this.state.logoouttxt} disabled={this.state.logoutbtn} onClick={(this.onLogoutclk.bind(this))}/>}
              />
            	<div className="curvedAdmin">
                <h1>Admin Functions :</h1>
                <div>lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum</div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
                    <path fill="#fff" fill-opacity="1" d="M0,160L60,144C120,128,240,96,360,80C480,64,600,64,720,80C840,96,960,128,1080,122.7C1200,117,1320,75,1380,53.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"/>
                </svg>
            	</div>
            </div>
        )
    }
}