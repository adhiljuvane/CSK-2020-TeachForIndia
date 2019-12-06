import React from 'react';
import { Transfer } from 'antd';


export default class EventListGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      targetKeys:[],
      selectedKeys: [],
    }
  }


  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
  }


  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    console.log("selectedKeys",this.state.selectedKeys);
    console.log("targetKeys", this.state.targetKeys);
  }


  render() {

    const mockData = [];

    for (let i = 0; i < 20; i++) {
      mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,

      });
    }




    return (
      <div>
        <Transfer
        showSearch
        dataSource={mockData}
        titles={['Source', 'Target']}
        targetKeys={this.state.targetKeys}
        selectedKeys={this.state.selectedKeys}
        onChange={this.handleChange}
        onSelectChange={this.handleSelectChange}
        render={item => item.title}
      />
      </div>
    );
  }
}
