import React from 'react';
import { Tabs, Card } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const View = () => {
  return (
    <Card style={{ height: '100%' }}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="New Purchase" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Previous Purchase" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Retailers" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      ,
    </Card>
  );
};

export default View;
