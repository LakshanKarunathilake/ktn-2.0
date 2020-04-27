import React, { useState } from 'react';
import { Button, Card, Steps, Typography } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  SmileOutlined
} from '@ant-design/icons';
import uid from 'uid';

const { Step } = Steps;
const { Text, Title } = Typography;

const steps = [
  {
    title: 'Purchase overview',
    content: (
      <>
        <Title level={4}>You are about to add a purchase</Title>
        <Text>You have to Follow Three Steps, to complete a purchase</Text>
      </>
    ),
    icon: <UserOutlined />
  },
  {
    title: 'Detailed Purchase',
    content: 'Second-content',
    icon: <SolutionOutlined />
  },
  {
    title: 'Last',
    content: 'Last-content',
    icon: <SmileOutlined />
  }
];

const NewPurchase = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    const current = currentStep + 1;
    setCurrentStep(current);
  };

  const prev = () => {
    const current = currentStep - 1;
    setCurrentStep(current);
  };
  return (
    <>
      <Steps current={currentStep}>
        {steps.map((item: any) => {
          return (
            <Step
              status="finish"
              title={item.title}
              icon={item.icon}
              key={uid()}
            />
          );
        })}
      </Steps>
      <Card style={{ height: '75vh', marginBottom: 15 }}>
        {steps[currentStep].content}
      </Card>
      {currentStep < steps.length - 1 && (
        <Button type="primary" onClick={() => next()}>
          Next
        </Button>
      )}
      {currentStep === steps.length - 1 && <Button type="primary">Done</Button>}
      {currentStep > 0 && (
        <Button style={{ margin: 8 }} onClick={() => prev()}>
          Previous
        </Button>
      )}
    </>
  );
};

export default NewPurchase;
