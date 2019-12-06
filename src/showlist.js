import React, { Component } from 'react';
import { Table, Icon, Divider } from 'antd';
import {db} from './config'

const columns = [{
  title: 'Roll No',
  dataIndex: 'rollno',
  key: 'rollno',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'GE1',
  dataIndex: 'ge1',
  key: 'ge1',
},
{
 title: 'GE2',
 dataIndex: 'ge2',
 key: 'ge2',
},
{
 title: 'GE3',
 dataIndex: 'ge3',
 key: 'ge3',
},
{
 title: 'GE4',
 dataIndex: 'ge4',
 key: 'ge4',
},
{
 title: 'GE5',
 dataIndex: 'ge5',
 key: 'ge5',
},
{
 title: 'IE1',
 dataIndex: 'ie1',
 key: 'ie1',
},
{
 title: 'IE2',
 dataIndex: 'ie2',
 key: 'ie2',
},
{
 title: 'IE3',
 dataIndex: 'ie3',
 key: 'ie3',
},
{
 title: 'IE4',
 dataIndex: 'ie4',
 key: 'ie4',
},
{
 title: 'IE5',
 dataIndex: 'ie5',
 key: 'ie5',
},
];

const dataa = [];

db.ref('CS').on('value',function(data){
  data.forEach(function(child){
    //console.log("data",child);
    dataa.push({
      rollno:child.val().regno,
      name: child.val().name,
    });
  })
    for (var i = 0; i < dataa.length; i++) {
      console.log(dataa[i].name);
    }
})



class Showlist extends Component {


  render() {

    return (
      <div>
        <Table columns={columns} dataSource={dataa} />
      </div>
    );
  }
}
export default Showlist
