import React from "react"
import "./Admin.css";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { message } from "antd";
import { Redirect , Link } from "react-router-dom";

export default class Admin extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			logoouttxt : "LOGOUT",
			disabled : false,
			redirect : false,
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
				this.setState({redirect : true})
		}

    render(){
				if(this.state.redirect === true){
					return <Redirect to="/" />
				}

        return(
            <div>
              <AppBar
                style={{backgroundColor : "#49475b"}}
                title="Chennai Students Kondattam 2020"
                showMenuIconButton={false}
                iconElementRight={<FlatButton label={this.state.logoouttxt} disabled={this.state.logoutbtn} onClick={(this.onLogoutclk.bind(this))}/>}
              />
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
								<path fill="#49475b" fill-opacity="1" d="M0,64L48,58.7C96,53,192,43,288,74.7C384,107,480,181,576,218.7C672,256,768,256,864,213.3C960,171,1056,85,1152,64C1248,43,1344,85,1392,106.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
							</svg>
            	<div className="curvedAdmin">
                <h1>Admin Functions :</h1>
                <div style={{display : "flex" , flexDirection : "column" , fontSize : "2rem" , alignItems : "center"}}>
									<Link to="/eventsAdmin">
										<div className="button1 button">Student Details</div>
									</Link>
									<Link to="/eventParticipation">
									<div className="button1 button" >Events & Partipants</div>
									</Link>
									<Link to="/printAdmin">
										<div className="button1 button" >Admin Print</div>
									</Link>
								</div>
            	</div>
            </div>
        )
    }
}