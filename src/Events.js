import React from 'react';
import { Transfer, message } from 'antd';
import {db} from './config'
import RaisedButton from 'material-ui/RaisedButton';

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      targetKeys:[],
      selectedKeys: [],
      storearr:[],
      count:1,
      lsit : [],
    }
  }

  componentDidMount(){
    var that = this;
    var ind = [];
    let sec = "";
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
    db.ref('events').child(sec).child(this.props.type).on('value',function(data){
      ind = []
      data.forEach(function(child){
        var m = {
          eventCategory : child.val().eventCategory,
          eventCode : child.val().eventCode,
          eventDescription : child.val().eventDescription,
          eventName : child.val().eventName,
          indOrGroup : child.val().indOrGroup,
          maxNoPart : child.val().maxNoPart,
          Strict : child.val().Strict,
          key : child.val().eventCode
        }
        ind.push(m)
      })
      that.setState({list : ind})
    })
  }

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
    console.log("targetKeys",this.state.targetKeys);
  }

  send(){
    if (this.state.targetKeys.length > this.state.count) {
      message.info('Only 1 events per Student Per Slot.');
    }
    else if(this.state.targetKeys.length < this.state.count){
      message.info('1 student must participate in one event from each slot!');
    }
    else{
      this.props.getDetails(this.state.targetKeys)
      message.success("Events Added");
    }
  }

//   save(){
//     if (this.state.targetKeys.length < 1) {
//       for (var i = 0; i < this.state.selectedKeys.length; i++) {
//         this.state.storearr.push(this.state.selectedKeys[i])
//       }
//     }
//     else {
//       for (var i = 0; i < this.state.targetKeys.length; i++) {
//         console.log("key",this.state.targetKeys[i]);
//         var index = this.state.storearr.indexOf(this.state.targetKeys[i]);
//         console.log("index",index);
//         console.log("length",this.state.targetKeys.length );
//         if(index != -1) {
//           this.state.storearr.splice(index, 1);
//           console.log("done");
//         }
//       }
//     }
//     console.log("saved",this.state.storearr);
//   }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    console.log("selectedKeys",this.state.selectedKeys);
    console.log("targetKeys", this.state.targetKeys);
  }


  render() {
    var data =[]
    data = this.state.list;
    return (
      <div style={{display : "flex" , flexDirection : "column" , alignItems : "center"}}>
        <Transfer
        showSearch
        dataSource={data}
        listStyle={{textAlign:'left'}}
        titles={['Source', 'Target']}
        targetKeys={this.state.targetKeys}
        selectedKeys={this.state.selectedKeys}
        onChange={this.handleChange}
        onSelectChange={this.handleSelectChange}
        render={item => item.eventName}
      />
      <RaisedButton label="Send" secondary={true} onClick={this.send.bind(this)} style={{marginTop : "10px"}}/>
      </div>
    );
  }
}
