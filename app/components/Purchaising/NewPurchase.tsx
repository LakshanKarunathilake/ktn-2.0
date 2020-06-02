import React, { useEffect, useState } from 'react';
import { Button, Card, Steps } from 'antd';
import { UserOutlined, SolutionOutlined } from '@ant-design/icons';
import uid from 'uid';
import swal from 'sweetalert';
import _ from 'lodash';
import Purchase, { PurchaseItem } from '../../models/Purchase';
import OverallInfo from '../Item/InformationSteps/overallInfo';
import PurchaseItems from '../Item/InformationSteps/purchaseItems';
import PurchaseService from '../../services/purchase';

const { Step } = Steps;

const NewPurchase = (props: {
  purchase: Purchase;
  updateForm: (key: string, value: string) => void;
}) => {
  const [invoiceItemTotal, setInvoiceItemTotal] = useState();

  const { purchase, updateForm } = props;
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setInvoiceItemTotal(
      _.sum(
        purchase.items.map((record: PurchaseItem) => {
          return record.cost * record.purchased;
        })
      ).toFixed(2)
    );
    console.log(
      'button',
      _.inRange(
        Math.abs(
          _.round(invoiceItemTotal) - _.round(parseFloat(purchase.total))
        ),
        100
      )
    );
  });

  const purchaseAction = () => {
    PurchaseService.addPurchase(purchase)
      .then(() => {
        return swal('Success', 'Purchase Record Added successful');
      })
      .catch((e: any) => {
        console.log('Error occured', e);
        return swal('Error', 'Purchase Record Adding failure', 'error');
      });
  };

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
      content: <PurchaseItems purchase={purchase} updateForm={updateForm} />,
      icon: <SolutionOutlined />
    }
  ];
  console.log('pr',purchase);
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
      {/* Deactivate button if the difference between invoice original total and  invoice items total are in range of 0 t0 100 */}
      {currentStep === steps.length - 1 &&
        _.inRange(
          Math.abs(
            _.round(invoiceItemTotal) - _.round(parseFloat(purchase.total))
          ),
          100
        ) && (
          <Button
            type="primary"
            disabled={purchase.items.length < 1}
            onClick={purchaseAction}
          >
            Done
          </Button>
        )}
    </>
  );
};

export default NewPurchase;
