import React, { useEffect, useState } from 'react';
import { AutoComplete, Card, Form, Input, Typography } from 'antd';
import Purchase from '../../../models/Purchase';
import PurchaseService from '../../../services/purchase';

const { Item } = Form;
const { Title, Text } = Typography;
const OverallInfo = (props: {
  purchase: Purchase;
  updateForm: (key: string, value: string) => void;
}) => {
  const { updateForm, purchase } = props;
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

  const onItemSearch = (searchText: string) => {
    if (searchText !== '') {
      setNames(
        allNames.filter(value =>
          value.value.toUpperCase().includes(searchText.toUpperCase())
        )
      );
    }
  };

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
  );
};

export default OverallInfo;
