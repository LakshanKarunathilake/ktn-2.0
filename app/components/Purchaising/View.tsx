import React from 'react';
import { Tabs, Card } from 'antd';
import NewPurchase from './NewPurchase';
import Purchase from '../../models/Purchase';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const View = (props: {
  purchase: Purchase;
  updateForm: (key: string, value: string) => void;
}) => {
  console.log('view props', props);
  const { purchase, updateForm } = props;
  return (
    <Card style={{ height: '100%' }}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="New Purchase" key="1">
          <NewPurchase purchase={purchase} updateForm={updateForm} />
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
