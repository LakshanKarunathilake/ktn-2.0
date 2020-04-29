import React, { useEffect, useState } from 'react';
import {
  AutoComplete,
  Button,
  Card,
  Steps,
  Form,
  Input,
  Typography
} from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  SmileOutlined
} from '@ant-design/icons';
import uid from 'uid';
import PurchaseService from '../../services/purchase';
import Purchase from '../../models/Purchase';
import OverallInfo from '../Item/InformationSteps/overallInfo';

const { Step } = Steps;

const NewPurchase = (props: {
  purchase: Purchase;
  updateForm: (key: string, value: string) => void;
}) => {
  console.log('new purch', props);
  const { purchase, updateForm } = props;
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    const current = currentStep + 1;
    setCurrentStep(current);
  };

  const prev = () => {
    const current = currentStep - 1;
    setCurrentStep(current);
  };

  const steps = [
    {
      title: 'Purchase overview',
      content: <OverallInfo purchase={purchase} updateForm={updateForm} />,
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
