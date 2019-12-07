import React from 'react';
import TextField from 'material-ui/TextField';
import { Upload, Icon, message } from 'antd';
import {db,storage,Auth} from './config'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


export default class PartDetailsUser extends React.Component {

  constructor(props){
    super(props)

    this.state = {
        previewVisible: false,
        previewImage: '',
        fileList:[],
        img:'',
        error:'',
        pReg:'', 
        pName:'',
        pClass : '',
        pAge : '',
        pSchool : '',
        pTeacherInCharge : '',
        pAddress : '',
        pMobile : '',
        imgUrl:'',
        key:'',
        branchActive:true,
        admin:false,
        progress:'',
        progress_vis:false,
    }
  }

  componentDidMount(){
var that  = this
    Auth.onAuthStateChanged(function(user) {
  if (user) {
    if(user.uid != 'vT00GEdpnKTuXiZlvAF2KJFgZ1j1' && !that.state.admin){
    db.ref('users').child(user.uid).once('value').then(function(data){
          var who = data.val().branch
          that.setState({ pTeacherInCharge : data.val().name})
      })
    }
    else{
      that.setState({admin:true})
      that.setState({branchActive:false})
    }
  } else {
    // No user is signed in.
  }
});


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
   }


uploadFile(){
  var self = this;
  fetch(this.state.img)
    .then(function(result){return result.blob()})
    .then(function(blob){

      var key_id = db.ref().child('particiants').push().key;
      console.log("ivideee");

      const uploadTask = storage.ref('photos/').child(key_id +'.jpg').put(blob);

        uploadTask.on('state_changed',
                      function(snapshot) {

                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        self.setState({progress_vis:true});
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("reached progress",progress);
                        self.setState({progress:Math.round(progress)});

                      }, function(error) {



                    }, function() {
                      // Upload completed successfully, now we can get the download URL
                      var downloadURL = uploadTask.snapshot.downloadURL;
                      //db.ref().child('particiant/'+key_id).set({key:downloadURL})
                      self.setState({imgUrl:downloadURL,key:key_id});
                      var data = {
                        name:self.state.pName,
                        reg:self.state.pReg,
                        img:self.state.imgUrl,
                        key:self.state.key,
                      }
                 self.setState({imgUrl:''})
                      self.props.getDetails(data)
                    //  self.setState({branchActive:true})
                    });
    })
}


onReg(e,str){
  this.setState({pReg:str})
}
onName(e,str){
  this.setState({pName:str})
}
onSave(){
  this.uploadFile()
  }

setSearch(){
  var that = this
  if(this.props.id.length < 1){
    message.info('Enter SearchID');
  }
  else{
    if (this.state.admin) {
      var bcode = this.props.adminList
      db.ref(this.props.adminList).child(this.props.id).once('value').then(function(data){
               that.setState({pName:data.val().name})
               that.setState({pReg:data.val().regno})
               that.setState({img:data.val().photo})
               that.setState({imgUrl:data.val().photo})
           }).catch(function(error) {
             message.info('Participant Details not found!!!');
             that.clearDataAdmin()
           });
    }
    else {
     db.ref(this.props.school).child(this.props.class).child(this.props.id).once('value').then(function(data){
       console.log(data.val(), "right Data");
           that.setState({pName:data.val().name})
           that.setState({pReg:data.val().regno})
           that.setState({pClass:data.val().class})
           that.setState({pSchool : data.val().school})
           that.setState({pAge : data.val().age})
           that.setState({pAddress : data.val().address})
           that.setState({pMobile : data.val().mobile})
           that.setState({img:data.val().photo})
           that.setState({imgUrl:data.val().photo})
       }).catch(function(error) {
         message.info('Participant Details not found');
         that.clearData()
       });
     }
     }
   }
   clearDataAdmin(){
     this.setState({pName:""})
     this.setState({pReg:""})
     this.setState({img:""})
     this.setState({imgUrl:""})
     this.setState({pSem:""})
     this.setState({branchCode:""})
   }
   clearData(){
     this.setState({pName:""})
     this.setState({pReg:""})
     this.setState({img:""})
     this.setState({imgUrl:""})
     this.setState({pSem:""})
   }

  render() {

    const { previewVisible, previewImage, fileList } = this.state;
           const uploadButton = (
             <div>
               <Icon type="plus" />
               <div className="ant-upload-text">Upload</div>
             </div>
           );


    return (
<div>
  <FloatingActionButton mini={true} secondary={true} onClick={this.setSearch.bind(this)}>
    <ContentAdd />
  </FloatingActionButton><br />
    <TextField
      errorText={this.state.error}
      floatingLabelText="Participant Name"
      value={this.state.pName}
      onChange={this.onName.bind(this)}
      errorText=""
    />
    <TextField
      floatingLabelText="Roll Number"
      errorText={this.state.error}
      value={this.state.pReg}
      onChange={this.onReg.bind(this)}
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
      floatingLabelText="Age"
      value={this.state.pAge}
      onChange={this.onAge} 
    />
    <TextField
      errorText={this.state.error}
      floatingLabelText="Address"
      value={this.state.pAddress}
      onChange={this.onAddres} 
    />
    <TextField
      errorText={this.state.error}
      floatingLabelText="Phone Number"
      value={this.state.pMobile}
      onChange={this.onMobile} 
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
    </div>
  </div>
    );
  }
}
