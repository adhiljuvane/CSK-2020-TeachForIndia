import React from 'react';

import {db , Auth} from './config'
import InfiniteScroll from 'react-infinite-scroller';
import { List,Icon,Popconfirm, message } from 'antd';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class EventListView extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      ind:[],
      admin:false,
    }
  }

  componentDidMount(){
    var that  = this
    Auth.onAuthStateChanged(function(user) {
      if (user) {
        if(user.uid != 'vT00GEdpnKTuXiZlvAF2KJFgZ1j1' && !that.state.admin){  
      }
      else{
      that.setState({admin:true})
     }
    } else {
    // No user is signed in.
    }
  });
}

setSearch(){
  var that = this;
  var ind = [];
  if(this.props.search.length < 1){
     message.info('Enter SearchID');
  }
  else {
    if (this.state.admin) {
      db.ref(this.props.school).child(this.props.class).child(this.props.search).child('events').child(this.props.type).child(this.props.list).once('value').then(function(data){
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
    console.log("ind", ind);
        that.setState({ind})
      }).catch(function(error) {
        message.info('Participant Details not found');
      });
    }
    else{
      var that = this ;
      console.log("adassas" , this.props.schoolCode , this.props.classCode , this.props.search , this.props.type , this.props.list)
      db.ref(this.props.schoolCode).child(this.props.classCode).child(this.props.search).child('events').child(this.props.type).child(this.props.type).once('value').then(function(data){
      ind = []
      if(data!==null){
        var m = {
          eventCategory : data.val().eventCategory,
          eventCode : data.val().eventCode,
          eventDescription : data.val().eventDescription,
          eventName : data.val().eventName,
          indOrGroup : data.val().indOrGroup,
          maxNoPart : data.val().maxNoPart,
          Strict : data.val().Strict,
          key : data.val().eventCode
        }
      ind.push(m)
      }
    that.setState({ind})
    console.log("inddd",ind)
  }).catch(function(error) {
    message.info('Participant Details not found');
  });
 }
}
}

//  confirm(key) {
//     console.log("key",key);
//     db.ref('eventlist').child(this.props.type).child(key).remove()
//      message.info('Event Deleted.');
//   }

  loadFunc = () => {
    //No use for this function.
  }


  render() {
    var data =[]
    data = this.state.ind;
    return (
      <div style={{margin:10}}>
      <FloatingActionButton mini={true} secondary={true} onClick={this.setSearch.bind(this)}>
        <ContentAdd />
      </FloatingActionButton><br />
        <InfiniteScroll
          loadMore={this.loadFunc()}
        >
            <List
            bordered={true}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item actions={[]}>
                <List.Item.Meta
                  title={item.eventName}
                />
              </List.Item>
            )}
          />

        </InfiniteScroll>
      </div>
    );
  }
}
