import React, { useEffect, useState } from 'react';
import { Card, Typography, Form, AutoComplete } from 'antd';
import PurchaseService from '../../services/purchase';

const { Text, Title } = Typography;
const { Item } = Form;

const AddRetailer = () => {
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
      <Card>
        <Title level={4}>Notes on adding new retailer</Title>
        <ul>
          <li>
            <Text>Make sure you are not entering the same retailer again</Text>
          </li>
          <li>
            <Text>State the name as shown in the invoice title</Text>
          </li>
          <li>
            <Text>Enter contact details as shown in the invoice </Text>
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
          />
        </Item>
      </Form>
    </>
  );
};

export default AddRetailer;
