import React, { useEffect, useState } from 'react';
import { AutoComplete, Card, Form, Input, Typography, DatePicker } from 'antd';
import Purchase from '../../../models/Purchase';
import PurchaseService from '../../../services/purchase';

const { Item } = Form;
const { Title, Text } = Typography;
const { Option } = AutoComplete;

const hints = {
  company: 'Select company from the list',
  billPrice: 'Enter bill price after reducing the discount(Final Cheque Value)',
  date: 'Select date as the invoice state'
};

const OverallInfo = (props: {
  purchase: Purchase;
  updateForm: (key: string, value: any) => void;
}) => {
  const { updateForm, purchase } = props;
  const [names, setNames] = useState<{ key: string; value: string }[]>([]);
  const [allNames, setAllNames] = useState<{ key: string; value: string }[]>(
    []
  );

  useEffect(() => {
    PurchaseService.getSuppliers()
      .then((val: any) => {
        const updated = val.map((v: any) => {
          return { key: v.id, value: v.name };
        });
        setNames(updated);
        return setAllNames(updated);
      })
      .catch((e: any) => {
        console.log('error', e);
      });
  }, []);

  const onItemSearch = (searchText: string) => {
    if (searchText !== '') {
      setNames(
        allNames.filter(value =>
          value.value.toUpperCase().includes(searchText.toUpperCase())
        )
      );
    }
  };

  console.log(purchase);

  return (
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
              Invoice total - discount should match the total of purchase item
              costs
            </Text>
          </li>
        </ul>
      </Card>
      <Form>
        <Item help={hints.company} style={{ marginBottom: 20 }}>
          <AutoComplete
            style={{ width: '40vw' }}
            onSearch={onItemSearch}
            placeholder="Retailer Name"
            value={purchase.companyId ? purchase.companyId.value : undefined}
            onChange={(value: string) => {
              const record = names.find(
                (companyRecord: any) => companyRecord.value === value
              );
              updateForm('companyId', record);
            }}
          >
            {names.map((companyDetail: { key: string; value: string }) => (
              <Option key={companyDetail.key} value={companyDetail.value}>
                {companyDetail.value}
              </Option>
            ))}
          </AutoComplete>
        </Item>
        <Item help={hints.billPrice} style={{ marginBottom: 20 }}>
          <Input
            style={{ width: '40vw' }}
            addonBefore="Rs."
            placeholder="Invoice Total"
            value={purchase.total === '0' ? '' : purchase.total}
            type="number"
            onChange={(event: any) => {
              updateForm('total', event.target.value);
            }}
          />
        </Item>
        <Item help={hints.date} style={{ marginBottom: 20 }}>
          <DatePicker
            value={purchase.date}
            onChange={(value: any) => {
              updateForm('date', value);
            }}
          />
        </Item>
      </Form>
    </>
  );
};

export default OverallInfo;
