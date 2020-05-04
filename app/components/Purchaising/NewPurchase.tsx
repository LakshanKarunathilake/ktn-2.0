import React, { useState } from 'react';
import { Button, Card, Steps } from 'antd';
import { UserOutlined, SolutionOutlined } from '@ant-design/icons';
import uid from 'uid';
import swal from 'sweetalert';
import Purchase from '../../models/Purchase';
import OverallInfo from '../Item/InformationSteps/overallInfo';
import PurchaseItems from '../Item/InformationSteps/purchaseItems';

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
      title: 'Purchase Items',
      content: <PurchaseItems purchase={purchase} updateForm={updateForm}/>,
      icon: <SolutionOutlined />
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
      {currentStep > 0 && (
        <Button style={{ margin: 8 }} onClick={() => prev()}>
          Previous
        </Button>
      )}
      {currentStep < steps.length - 1 && (
        <Button
          type="primary"
          onClick={() => {
            if (
              purchase.total !== '' &&
              purchase.invoiceNo !== '' &&
              purchase.date !== undefined
            ) {
              next();
            } else {
              swal(
                'Warning',
                'You can not proceed without filling the above details',
                'warning'
              );
            }
          }}
        >
          Next
        </Button>
      )}
      {currentStep === steps.length - 1 && <Button type="primary">Done</Button>}
    </>
  );
};

export default NewPurchase;
