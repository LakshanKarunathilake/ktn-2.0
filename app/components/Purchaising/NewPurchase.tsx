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

const { Step } = Steps;
const { Item } = Form;
const { Title, Text } = Typography;

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
        setNames(updated);
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
      setNames(
        allNames.filter(value =>
          value.value.toUpperCase().includes(searchText.toUpperCase())
        )
      );
    }
  };

  const steps = [
    {
      title: 'Purchase overview',
      content: (
        <>
          <Card style={{ marginBottom: 50 }}>
            <Title level={4}>New purchase add note</Title>
            <ul>
              <li>
                <Text>Make sure you select the correct Supplier</Text>
              </li>
              <li>
                <Text>
                  If supplier is not there and new one but you need Super user
                  password
                </Text>
              </li>
              <li>
                <Text>
                  Invoice total - discount should match the total of purchase
                  item costs
                </Text>
              </li>
            </ul>
          </Card>
          <Form>
            <Item>
              <AutoComplete
                options={names}
                style={{ width: '40vw' }}
                onSearch={onItemSearch}
                placeholder="Retailer Name"
                value={purchase.invoiceNo}
                onChange={(value: string) => {
                  updateForm('invoiceNo', value);
                }}
              />
            </Item>
            <Item>
              <Input
                style={{ width: '40vw' }}
                addonBefore="Rs."
                placeholder="Invoice Total"
                value={purchase.total}
                type="number"
                onChange={(event: any) => {
                  updateForm('total', event.target.value);
                }}
              />
            </Item>
            <Item>
              <Input
                style={{ width: '40vw' }}
                addonAfter="%"
                placeholder="Discount Percentage"
                value={purchase.discount}
                type="number"
                onChange={(event: any) => {
                  updateForm('discount', event.target.value);
                }}
              />
            </Item>
          </Form>
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
