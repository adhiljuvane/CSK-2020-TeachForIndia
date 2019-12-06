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
      count:25,
    }
  }

  componentDidMount(){
    var that = this;
    var ind = [];
    db.ref('eventlist').child(this.props.type).on('value',function(data){
      ind = []
      data.forEach(function(child){
        //console.log("data",child);
        var m = {
          key:child.key,
          id:child.val().id,
          name:child.val().name,
          cat:child.val().type
        }
        ind.push(m)
      })
      that.setState({ind})
    })
  }

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
  }

  send(){
    if (this.state.targetKeys.length > this.state.count) {
         message.info('Only 5 events per Participant.');
    }
    else{
      this.props.getDetails(this.state.targetKeys)
    }
  }

  save(){
    if (this.state.targetKeys.length < 1) {
      for (var i = 0; i < this.state.selectedKeys.length; i++) {
        this.state.storearr.push(this.state.selectedKeys[i])
      }
    }
    else {
      for (var i = 0; i < this.state.targetKeys.length; i++) {
        console.log("key",this.state.targetKeys[i]);
        var index = this.state.storearr.indexOf(this.state.targetKeys[i]);
        console.log("index",index);
        console.log("length",this.state.targetKeys.length );
        if(index != -1) {
          this.state.storearr.splice(index, 1);
          console.log("done");
        }
      }
    }
    console.log("saved",this.state.storearr);
  }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    console.log("selectedKeys",this.state.selectedKeys);
    console.log("targetKeys", this.state.targetKeys);
  }


  render() {
    var data =[]
    data = this.state.ind;
    return (
      <div>
        <Transfer
        showSearch
        dataSource={data}
        listStyle={{textAlign:'left'}}
        titles={['Source', 'Target']}
        targetKeys={this.state.targetKeys}
        selectedKeys={this.state.selectedKeys}
        onChange={this.handleChange}
        onSelectChange={this.handleSelectChange}
        render={item => item.name}
      />
    <RaisedButton label="Send" secondary={true} onClick={this.send.bind(this)}/>
      </div>
    );
  }
}
