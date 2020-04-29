import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Card, Steps, Typography } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  SmileOutlined
} from '@ant-design/icons';
import uid from 'uid';
import PurchaseService from '../../services/purchase';
import Purchase from '../../models/Purchase';

const { Step } = Steps;

const NewPurchase = (props: {
  purchase: Purchase;
  updateForm: (key: string, value: string) => void;
}) => {
  console.log('new purch', props);
  const { purchase, updateForm } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [names, setNames] = useState<{ value: string }[]>([]);
  const [allNames, setAllNames] = useState<{ value: string }[]>([]);

  useEffect(() => {
    PurchaseService.getSuppliers()
      .then((val: any) => {
        const updated = val.map((v: any) => {
          return { value: v.name };
        });
        return setAllNames(updated);
      })
      .catch((e: any) => {
        console.log('error', e);
      });
  }, []);
  const next = () => {
    const current = currentStep + 1;
    setCurrentStep(current);
  };

  const prev = () => {
    const current = currentStep - 1;
    setCurrentStep(current);
  };

  const onItemSearch = (searchText: string) => {
    if (searchText !== '') {
      setNames(allNames.filter(value => value.value === searchText));
    }
  };

  const steps = [
    {
      title: 'Purchase overview',
      content: (
        <>
          <AutoComplete
            options={names}
            style={{ width: '40vw' }}
            onSearch={onItemSearch}
            placeholder="Part number"
            value={purchase.invoiceNo}
            onChange={(value: string) => {
              updateForm('code', value);
            }}
          />
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
