import React from 'react';
import { Tabs, Card, Steps, Typography } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  SmileOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Step } = Steps;
const { Text, Title } = Typography;

function callback(key) {
  console.log(key);
}

const View = () => {
  return (
    <Card style={{ height: '100%' }}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="New Purchase" key="1">
          <Card>
            <Title level={4}>You are about to add a purchase</Title>
            <Text>You have to Follow Three Steps, to complete a purchase</Text>
          </Card>
          <Steps>
            <Step
              status="finish"
              title="Purchase overview"
              icon={<UserOutlined />}
            />
            <Step
              status="finish"
              title="Detailed Purchase"
              icon={<SolutionOutlined />}
            />
            <Step
              status="finish"
              title="Confirmation"
              icon={<SmileOutlined />}
            />
          </Steps>
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
