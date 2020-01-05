import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { message } from "antd";

export default class EventsAdmin extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			logoouttxt : 'LOGOUT',
			logoutbtn : true ,
			schoolData : [],
			viewSchools : true,
			viewClasses : false,
			schoolCode : '',
			classCode : ''
		}
	}

	compononentDidMount(){

	}

	onSchoolClick = (schoolCode) => {
		console.log("code",schoolCode)
		this.setState({viewSchools : false , viewClasses : true , schoolCode : schoolCode})
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
            		style={{backgroundColor : "#3e4e50"}}
            		title="Chennai Students Kondattam 2020"
          			showMenuIconButton={false}
          			iconElementRight={<FlatButton label={this.state.logoouttxt} disabled={this.state.logoutbtn} onClick={(this.onLogoutclk.bind(this))}/>}
        			/>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
								<path fill="#3e4e50" fill-opacity="1" d="M0,64L48,69.3C96,75,192,85,288,112C384,139,480,181,576,165.3C672,149,768,75,864,58.7C960,43,1056,85,1152,106.7C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
							</svg>
							<div style={{display : "flex" , flexDirection : "row" , justifyContent : "space-evenly" , marginTop : "-100px"}}>
								<div>
									{this.state.viewSchools ?
										<div>
											<h1>Schools</h1>
											<div style={{ cursor : "pointer"}}>
												<div onClick={() => this.onSchoolClick('CHEABM')}>Ambal.Mat. Hr. Sec. School - CHEABM</div>
												<div onClick={() => this.onSchoolClick('CHEABG')}>Anjuman Matriculation School - CHEABG</div>
												<div onClick={() => this.onSchoolClick('CHEAAT')}>CHS Kannamapet - CHEAAT</div>
												<div onClick={() => this.onSchoolClick('CHEAAN')}>CHS Kottur - CHEAAN</div>
												<div onClick={() => this.onSchoolClick('CHEAAJ')}>CHS McNichols - CHEAAJ</div>
												<div onClick={() => this.onSchoolClick('CHEAAI')}>CHS New Market Farm - CHEAAI</div>
												<div onClick={() => this.onSchoolClick('CHEAAF')}>CHS TV Samy street - CHEAAF</div>
												<div onClick={() => this.onSchoolClick('CHEAAQ')}>CHSS Koyambedu - CHEAAQ</div>
												<div onClick={() => this.onSchoolClick('CHEAAV')}>CHSS Puliyur - CHEAAV</div>
												<div onClick={() => this.onSchoolClick('CHEAAY')}>CHSS TH Road - CHEAAY</div>
												<div onClick={() => this.onSchoolClick('CHEAAR')}>CHSS Tharamani - CHEAAR</div>
												<div onClick={() => this.onSchoolClick('CHEAAM')}>CHSS Thiruvanmiyur - CHEAAM</div>
												<div onClick={() => this.onSchoolClick('CHEABA')}>CHSS Velachery - CHEABA</div>
												<div onClick={() => this.onSchoolClick('CHEAAZ')}>CMS Arumbakkam - CHEAAZ</div>
												<div onClick={() => this.onSchoolClick('CHEAAX')}>CMS MGR Nagar II - CHEAAX</div>
												<div onClick={() => this.onSchoolClick('CHEABE')}>CMS MMDA I - CHEABE</div>
												<div onClick={() => this.onSchoolClick('CHEABD')}>CMS Pudumaniyakuppam - CHEABD</div>
												<div onClick={() => this.onSchoolClick('CHEAAU')}>CPS Goyyathope - CHEAAU</div>
												<div onClick={() => this.onSchoolClick('CHEABI')}>CPS Kottur - CHEABI</div>
												<div onClick={() => this.onSchoolClick('CHEABJ')}>CPS McNichols - CHEABJ</div>
												<div onClick={() => this.onSchoolClick('CHEAAL')}>CPS Rangarajapuram - CHEAAL</div>
												<div onClick={() => this.onSchoolClick('CHEABK')}>CPS TH Road - CHEABK</div>
												<div onClick={() => this.onSchoolClick('CHEABL')}>CPS Tiruvanmiyur - CHEABL</div>
												<div onClick={() => this.onSchoolClick('CHEABF')}>CUMS Perambur Barracks Road - CHEABF</div>
												<div onClick={() => this.onSchoolClick('CHEABH')}>RBANC Nursery and Primary School - CHEABH</div>
												<div onClick={() => this.onSchoolClick('CHEABN')}>Sri SB Vijaya Reddiar Memorial.Mat. Hr. Sec. School - CHEABN</div>
												<div onClick={() => this.onSchoolClick('CHEAAC')}>Vidyaniketan Matriculation School - CHEAAC</div>
											</div>
										</div> 
									: null}
									{this.state.viewClasses ? 
										<div>
											<h1>Classes</h1>
										</div> 
									: null}
								</div>
								<div>
									<h1>Events</h1>
									<div>

									</div>
								</div>
							</div>
            </div>
        )
    }
}