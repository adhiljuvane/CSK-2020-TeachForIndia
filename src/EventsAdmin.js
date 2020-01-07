import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Tree , message , Icon , Table, Divider, Tag} from "antd";
import { Redirect } from "react-router-dom"
import { db } from "./config";

const { TreeNode } = Tree;
const { Column, ColumnGroup } = Table;

export default class EventsAdmin extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			logoouttxt : 'LOGOUT',
			logoutbtn : false ,
			schoolData : [],
			viewSchools : true,
			viewClasses : false,
			schoolCode : '',
			classCode : '',
			studentDetails : []
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
				message.info('Logged Out!');
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

		onSelect = (keys, event) => {
			var that = this ;
			let schoolCode = keys[0].slice(0,6);
			let classCode = keys[0];
			if(schoolCode !== classCode){
				db.ref('school').child(schoolCode).child(classCode).on("value", function(data){
					let studentDetails = [];
					data.forEach(item => {
						let m = {
							city : item.val().city,
							classCode : item.val().classCode,
							cluster : item.val().cluster,
							fellowEmail : item.val().fellowEmail,
							fellowName : item.val().fellowName,
							gender : item.val().gender,
							grade : item.val().grade,
							school : item.val().school,
							schoolCode : item.val().schoolCode,
							schoolType : item.val().schoolType,
							section : item.val().section,
							studentId : item.val().studentId,
							studentName : item.val().studentName,
							studentYOI : item.val().studentYOI,
							yol : item.val().yol,
						}
						studentDetails.push(m);
					})
					that.setState({studentDetails})
				})
				this.setState({viewSchools : false , viewClasses : true})
			}
		};

    render(){
			if(this.state.redirect === true){
				return <Redirect to="/" />
			}
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
								<div style={{display : "flex" , flexDirection : "column" , alignItems : "flex-start" , width : "100%" , margin :"20px"}}>
									{this.state.viewSchools ?
										<div style={{width : "100%" , display : "flex" , flexDirection : "column" , alignItems : "flex-start"}}>
											<h1>Schools</h1>
											<div style={{ cursor : "pointer"}}>
											<Tree
												showLine
												defaultExpandAll={true}
        								switcherIcon={<Icon type="down" />}
        								defaultExpandedKeys={['0-0-0']}
        								onSelect={this.onSelect}
      								>
        								<TreeNode title="Ambal.Mat. Hr. Sec. School - CHEABM" key="CHEABM">
													<TreeNode title="2 A => CHEABM01" key="CHEABM01"/>
													<TreeNode title="3 A => CHEABM02" key="CHEABM02"/>
												</TreeNode>
												<TreeNode title="Anjuman Matriculation School - CHEABG" key="CHEABG">
													<TreeNode title="4 A => CHEABG01" key="CHEABG01" />
													<TreeNode title="4 B => CHEABG02" key="CHEABG02" />
													<TreeNode title="3 A => CHEABG03" key="CHEABG03"/>
													<TreeNode title="3 B => CHEABG04" key="CHEABG04" />
												</TreeNode>
        								<TreeNode title="CHS Kannamapet - CHEAAT" key="CHEAAT">
													<TreeNode title="8 A => CHEAAT01" key="CHEAAT01" />
													<TreeNode title="6 A => CHEAAT03" key="CHEAAT03" />
												</TreeNode>
        								<TreeNode title="CHS Kottur - CHEAAN" key="CHEAAN">
													<TreeNode title="8 A => CHEAAN03" key="CHEAAN03"/>
													<TreeNode title="8 B => CHEAAN04" key="CHEAAN04" />
													<TreeNode title="7 A => CHEAAN06" key="CHEAAN06"/>
													<TreeNode title="7 B => CHEAAN07" key="CHEAAN07"/>
												</TreeNode>
        								<TreeNode title="CHS McNichols - CHEAAJ" key="CHEAAJ">
													<TreeNode title="7 B => CHEAAJ03" key="CHEAAJ03" />
													<TreeNode title="6 B => CHEAAJ04" key="CHEAAJ04" />
												</TreeNode>
        								<TreeNode title="CHS New Market Farm - CHEAAI" key="CHEAAI">
													<TreeNode title="7 B => CHEAAI03" key="CHEAAI03"/>
													<TreeNode title="7 A => CHEAAI04" key="CHEAAI04"/>
												</TreeNode>
        								<TreeNode title="CHS TV Samy street - CHEAAF" key="CHEAAF">
													<TreeNode title="7 A => CHEAAF01" key="CHEAAF01"/>
													<TreeNode title="7 B => CHEAAF02" key="CHEAAF02"/>
													<TreeNode title="6 A => CHEAAF03" key="CHEAAF03"/>
													<TreeNode title="6 B => CHEAAF04" key="CHEAAF04"/>
													<TreeNode title="6 C => CHEAAF05" key="CHEAAF05"/>
												</TreeNode>
        								<TreeNode title="CHSS Koyambedu - CHEAAQ" key="CHEAAQ">
													<TreeNode title="8 A => CHEAAQ03" key="CHEAAQ03"/>
													<TreeNode title="8 B => CHEAAQ04" key="CHEAAQ04"/>
													<TreeNode title="7 D => CHEAAQ05" key="CHEAAQ05"/>
													<TreeNode title="7 B => CHEAAQ06" key="CHEAAQ06"/>
													<TreeNode title="7 C => CHEAAQ07" key="CHEAAQ07"/>
												</TreeNode>
        								<TreeNode title="CHSS Puliyur - CHEAAV" key="CHEAAV">
													<TreeNode title="8 C => CHEAAV01" key="CHEAAV01"/>
													<TreeNode title="8 B => CHEAAV02" key="CHEAAV02"/>
													<TreeNode title="8 A => CHEAAV03" key="CHEAAV03"/>
													<TreeNode title="7 A => CHEAAV04" key="CHEAAV04"/>
													<TreeNode title="7 B => CHEAAV05" key="CHEAAV05"/>
												</TreeNode>
        								<TreeNode title="CHSS TH Road - CHEAAY" key="CHEAAY">
													<TreeNode title="8 C => CHEAAY01" key="CHEAAY01"/>
													<TreeNode title="8 B => CHEAAY02" key="CHEAAY02"/>
													<TreeNode title="8 A => CHEAAY03" key="CHEAAY03"/>
													<TreeNode title="7 C => CHEAAY04" key="CHEAAY04"/>
													<TreeNode title="7 A => CHEAAY05" key="CHEAAY05"/>
													<TreeNode title="7 B => CHEAAY06" key="CHEAAY06"/>
												</TreeNode>
        								<TreeNode title="CHSS Tharamani - CHEAAR" key="CHEAAR">
													<TreeNode title="8 B => CHEAAR04" key="CHEAAR04"/>
													<TreeNode title="8 C => CHEAAR05" key="CHEAAR05"/>
													<TreeNode title="8 A => CHEAAR06" key="CHEAAR06"/>
													<TreeNode title="7 A => CHEAAR07" key="CHEAAR07"/>
													<TreeNode title="7 B => CHEAAR08" key="CHEAAR08"/>
													<TreeNode title="7 C => CHEAAR09" key="CHEAAR09"/>
												</TreeNode>
        								<TreeNode title="CHSS Thiruvanmiyur - CHEAAM" key="CHEAAM">
													<TreeNode title="7 A => CHEAAM04" key="CHEAAM04"/>
													<TreeNode title="6 A => CHEAAM05" key="CHEAAM05"/>
													<TreeNode title="8 A => CHEAAM06" key="CHEAAM06"/>
													<TreeNode title="8 B => CHEAAM07" key="CHEAAM07"/>
													<TreeNode title="6 B => CHEAAM11" key="CHEAAM11"/>
													<TreeNode title="6 C => CHEAAM12" key="CHEAAM12"/>
												</TreeNode>
        								<TreeNode title="CHSS Velachery - CHEABA" key="CHEABA">
													<TreeNode title="7 B => CHEABA01" key="CHEABA01"/>
													<TreeNode title="7 C => CHEABA02" key="CHEABA02"/>
													<TreeNode title="6 B => CHEABA03" key="CHEABA03"/>
													<TreeNode title="6 C => CHEABA04" key="CHEABA04"/>
												</TreeNode>
        								<TreeNode title="CMS Arumbakkam - CHEAAZ" key="CHEAAZ">
													<TreeNode title="8 A => CHEAAZ01" key="CHEAAZ01"/>
													<TreeNode title="7 A => CHEAAZ03" key="CHEAAZ03"/>
												</TreeNode>
        								<TreeNode title="CMS MGR Nagar II - CHEAAX" key="CHEAAX">
													<TreeNode title="7 D => CHEAAX01" key="CHEAAX01"/>
													<TreeNode title="7 C => CHEAAX02" key="CHEAAX02"/>
													<TreeNode title="7 A => CHEAAX03" key="CHEAAX03"/>
													<TreeNode title="7 E => CHEAAX04" key="CHEAAX04"/>
													<TreeNode title="7 B => CHEAAX05" key="CHEAAX05"/>
												</TreeNode>
        								<TreeNode title="CMS MMDA I - CHEABE" key="CHEABE">
													<TreeNode title="7 A => CHEABE01" key="CHEABE01"/>
													<TreeNode title="7 B => CHEABE02" key="CHEABE02"/>
													<TreeNode title="6 A => CHEABE03" key="CHEABE03"/>
													<TreeNode title="5 A => CHEABE04" key="CHEABE04"/>
													<TreeNode title="6 B => CHEABE05" key="CHEABE05"/>
												</TreeNode>
        								<TreeNode title="CMS Pudumaniyakuppam - CHEABD" key="CHEABD">
													<TreeNode title="7 A => CHEABD01" key="CHEABD01"/>
													<TreeNode title="6 A => CHEABD02" key="CHEABD02"/>
												</TreeNode>
        								<TreeNode title="CPS Goyyathope - CHEAAU" key="CHEAAU">
													<TreeNode title="5 A => CHEAAU04" key="CHEAAU04"/>
												</TreeNode>
        								<TreeNode title="CPS Kottur - CHEABI" key="CHEABI">
													<TreeNode title="3 A => CHEABI01" key="CHEABI01"/>
													<TreeNode title="3 B => CHEABI02" key="CHEABI02"/>
												</TreeNode>
        								<TreeNode title="CPS McNichols - CHEABJ" key="CHEABJ">
													<TreeNode title="2 A => CHEABJ01" key="CHEABJ01"/>
													<TreeNode title="3 A => CHEABJ02" key="CHEABJ02"/>
												</TreeNode>
        								<TreeNode title="CPS Rangarajapuram - CHEAAL" key="CHEAAL">
													<TreeNode title="5 A => CHEAAL05" key="CHEAAL05"/>
												</TreeNode>
        								<TreeNode title="CPS Tiruvanmiyur - CHEABL" key="CHEABL">
													<TreeNode title="3 A => CHEABL01" key="CHEABL01"/>
													<TreeNode title="3 B => CHEABL02" key="CHEABL02"/>
													<TreeNode title="3 C => CHEABL03" key="CHEABL03"/>
												</TreeNode>
												<TreeNode title="CPS TH Road - CHEABK" key="CHEABK">
													<TreeNode title="3 D => CHEABK01" key="CHEABK01"/>
													<TreeNode title="3 B => CHEABK02" key="CHEABK02"/>
													<TreeNode title="3 C => CHEABK03" key="CHEABK03"/>
												</TreeNode>
        								<TreeNode title="CUMS Perambur Barracks Road - CHEABF" key="CHEABF">
													<TreeNode title="5 A => CHEABF01" key="CHEABF01"/>
													<TreeNode title="6 A => CHEABF02" key="CHEABF02"/>
													<TreeNode title="7 A => CHEABF03" key="CHEABF03"/>
												</TreeNode>
        								<TreeNode title="RBANC Nursery and Primary School - CHEABH" key="CHEABH">
													<TreeNode title="3 A => CHEABH01" key="CHEABH01"/>
													<TreeNode title="4 A => CHEABH02" key="CHEABH02"/>
													<TreeNode title="2 A => CHEABH03" key="CHEABH03"/>
												</TreeNode>
        								<TreeNode title="Sri SB Vijaya Reddiar Memorial.Mat. Hr. Sec. School - CHEABN" key="CHEABN">
													<TreeNode title="2 A => CHEABN01" key="CHEABN01"/>
													<TreeNode title="2 B => CHEABN02" key="CHEABN02"/>
												</TreeNode>
        								<TreeNode title="Vidyaniketan Matriculation School - CHEAAC" key="CHEAAC">
													<TreeNode title="9 A => CHEAAC02" key="CHEAAC02"/>
													<TreeNode title="8 A => CHEAAC03" key="CHEAAC03"/>
													<TreeNode title="7 A => CHEAAC04" key="CHEAAC04"/>
													<TreeNode title="6 B => CHEAAC05" key="CHEAAC05"/>
													<TreeNode title="6 A => CHEAAC06" key="CHEAAC06"/>
													<TreeNode title="2 A => CHEAAC07" key="CHEAAC07"/>
													<TreeNode title="2 B => CHEAAC08" key="CHEAAC08"/>
												</TreeNode>
      								</Tree>
											</div>
										</div> 
									: null}
									{this.state.viewClasses ? 
										<div>
											<h1>Classes</h1>
											<Table dataSource={this.state.studentDetails} pagination={false}>
												<Column title="ID" dataIndex="studentId" key="studentId" />
												<Column title="Name" dataIndex="studentName" key="studentName" />
												<Column title="Gender" dataIndex="gender" key="gender" />
												<Column title="Student YOI" dataIndex="studentYOI" key="studentYOI" />
												<Column title="Class Teacher" dataIndex="fellowName" key="fellowName" />
												<Column title="Email" dataIndex="fellowEmail" key="fellowEmail" />
												<Column title="School Code" dataIndex="schoolCode" key="schoolCode" />
												<Column title="Class Code" dataIndex="classCode" key="classCode" />
											</Table>
										</div> 
									: null}
								</div>
							</div>
            </div>
        )
    }
}