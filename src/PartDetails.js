import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Upload, Icon, message, Progress, notification , Select} from 'antd';
import {db,storage,Auth} from './config';

const { Option } = Select;


export default class PartDetail extends React.Component {

  constructor(props){
    super(props)

    this.state = {
        previewVisible: false,
        previewImage: '',
        fileList:[],
        img:'',
        error:'',
        pReg:'', //remove
        pName:'',
        pClass : '',
        pSchool : '',
        pTeacherInCharge : '',
        pMobile : '',
        imgUrl:'',
        key:'',
        branchActive:true,
        admin:false,
        progress:'',
        progress_vis:false,
        size:false,
        schoolCode : '',
        classCode : '',
        students : [],
    }
  }

  componentDidMount(){
    var that = this ;
    this.setState({schoolCode : localStorage.getItem("schoolCode") , pSchool : localStorage.getItem("school") , pTeacherInCharge : localStorage.getItem("name") , classCode : localStorage.getItem("classCode") , pClass : localStorage.getItem("class") , pMobile : localStorage.getItem("mobile")});
    db.ref('school').child(localStorage.getItem("schoolCode")).child(localStorage.getItem("classCode")).once("value", function(data){
      let student = []
      data.forEach(item => {
        student.push(item.val());
      })
      that.setState({ students : student});
    })
  }


  handleFile(event){
    //console.log("event",event.data);
     const name = event.uid;
     const self = this;
     var reader =new FileReader();
     reader.onload=function(evt){
       //jsonData(evt.target.result)
       self.setState({img:evt.target.result,});
     }
     reader.readAsDataURL(event.file.originFileObj)
     if (event.file.size >= 400000) {
       self.setState({size:true})
        message.info('Image Size Should Be Less Than 400kB');
     }
     else {
       self.setState({size:false})
     }
   }


uploadFile(){
  console.log("dssss")
  var self = this;
  fetch(this.state.img)
    .then(function(result){return result.blob()})
    .then(function(blob){
      var key_id = db.ref('particiants').push().key;  //var key_id = db.ref().child('particiants').push().key;
      console.log(key_id,"ivideee");
      const uploadTask = storage.ref('photos/').child(key_id +'.jpg').put(blob);
        uploadTask.on('state_changed',
                      function(snapshot) {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        self.setState({progress_vis:true});
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("reached progress",progress);
                        self.setState({progress:parseInt(Math.round(progress))});
                      }, function(error) {
                          console.log("eerrror in photo upload" ,error)
                        }, function() {
                      // Upload completed successfully, now we can get the download URL
                      var downloadURL = uploadTask.snapshot.downloadURL;
                      //db.ref().child('particiant/'+key_id).set({key:downloadURL})
                      self.setState({imgUrl:downloadURL,key:key_id});
                      console.log("imageUrl",self.mgUrl,self.key_id)
                      var data = {
                        name:self.state.pName,
                        reg:self.state.pReg,
                        mobile:self.state.pMobile,
                        class:self.state.pClass,
                        school:self.state.pSchool,
                        schoolCode : self.state.schoolCode,
                        classCode : self.state.classCode,
                        pTeacherInCharge : self.state.pTeacherInCharge,
                        img:self.state.imgUrl,
                        key:self.state.key,
                      }
                 self.setState({imgUrl:''})
                      self.props.getDetails(data)
                      self.setState({size : true})
                    //  self.setState({branchActive:true})
                    });
    })
}


onReg(e,str){
  this.setState({pReg:str})
  this.setState({size:false})
}
onName(value){
  var that = this;
  this.setState({pName:value})
  db.ref('school').child(this.state.schoolCode).child(this.state.classCode).on("value",function(data){
    data.forEach(item => {
      if(item.val().studentName === value){
        that.setState({pReg : item.val().studentId})
      }
    })
  })
}
onClass = (e,str) => {
  this.setState({pClass:str})
}
onMobile =(e,str) => {
  this.setState({pMobile:str})
}

onTeacherInCharge = (e,str) => {
  this.setState({pTeacherInCharge:str})
}

onSave(){
  var that = this;
  if ((this.state.pClass.length < 1)||(this.state.pName.length < 1)||(this.state.pMobile.length < 1) ||(this.state.pTeacherInCharge.length < 1)) {
  message.info('Enter Particiant Details');
  }
  else {
  db.ref(this.state.schoolCode).child(this.state.classCode).child(this.state.pReg).on('value' , function(data){
  if (data.val()!==null) {
    // that.showNotification();
    that.setState({size:true})
  }
  else{
      that.uploadFile()
    }
    })
  }
}

showNotification(){
  notification.open({
    message: 'Roll Number Already Present in '+this.state.classCode+" !",
    description: 'If any Modifications has to be made, please delete the respected perticipant and enter the details again. ',
    icon: <Icon type="exclamation-circle" style={{ color: '#FF0000' }} />,
    duration: 6,
  });
}

  render() {
           const uploadButton = (
             <div>
               <Icon type="plus" />
               <div className="ant-upload-text">Upload</div>
             </div>
           );
    return (
  <div>
      <Select placeholder="Select student" style={{width : "90%"}} onChange={this.onName.bind(this)} value={this.state.pName}>
        {this.state.students.map((item,key) => {
          return <Option key={key} value={item.studentName}>{item.studentName}</Option>
        })}
      </Select>
      <TextField
        floatingLabelText="Roll Number"
        errorText={this.state.error}
        value={this.state.pReg}
        onChange={this.onReg.bind(this)}
        disabled={this.state.branchActive}
      />
      <TextField
        errorText={this.state.error}
        floatingLabelText="School"
        value={this.state.pSchool}
        disabled={this.state.branchActive}
      />
      <TextField
        errorText={this.state.error}
        floatingLabelText="Class"
        value={this.state.pClass}
        disabled={this.state.branchActive}
      />
      <TextField
        errorText={this.state.error}
        disabled={this.state.branchActive}
        floatingLabelText="Teacher-in-charge"
        value={this.state.pTeacherInCharge}
      />
      <TextField
        errorText={this.state.error}
        floatingLabelText="Phone Number"
        value={this.state.pMobile}
        onChange={this.onMobile}
        disabled={this.state.branchActive}
      />
      <div style={{width:'22%',margin:'auto'}}>
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          onChange={this.handleFile.bind(this)}
        >
          {this.state.img ? <img src={this.state.img} width='100%' alt="dfbgd" /> : uploadButton}
        </Upload>
        <Progress type="circle" percent={parseInt(this.state.progress)} showInfo={this.state.progress_vis} width={80} style={{marginBottom : "8px"}}/>
      </div>
      <RaisedButton label="Save" primary={true} onClick={this.onSave.bind(this)} disabled={this.state.size}/><br /><br />
    </div>
  )}
}
