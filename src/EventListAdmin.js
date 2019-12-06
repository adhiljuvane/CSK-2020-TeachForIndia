import React from 'react';

import {db} from './config'
import InfiniteScroll from 'react-infinite-scroller';
import { List,Icon,Popconfirm, message } from 'antd';

export default class EventListAdmin extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      ind:[],
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

 confirm(key) {
    console.log("key",key);
    db.ref('eventlist').child(this.props.type).child(key).remove()
     message.info('Event Deleted.');
}



  render() {

    var data =[]
    data = this.state.ind;

    return (
      <div style={{margin:10}}>
        <InfiniteScroll>

            <List
            bordered={true}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item actions={[
                  <Popconfirm placement="right" title="Are you sure you wanna delete this?" onConfirm={this.confirm.bind(this,item.key)} okText="Yes" cancelText="No">
                    <Icon type="delete" />
                  </Popconfirm>]}>
                <List.Item.Meta
                  title={item.name}
                />
              </List.Item>
            )}
          />

        </InfiniteScroll>
      </div>
    );
  }
}
