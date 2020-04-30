import React, { useState } from 'react';
import { AutoComplete, Button, Card, Form, Input, Table } from 'antd';
import { CardActions } from '@material-ui/core';

const { Item } = Form;

const PurchaseItems = () => {
  let tableDataKey = 0;
  const [partNumber, setPartNumber] = useState('');
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState(0);
  const [selling, setSelling] = useState(0.0);
  const [cost, setCost] = useState(0.0);
  const [purchased, setPurchased] = useState(0);
  const [dataSource, setDataSource] = useState<
    Array<{
      key: number;
      partNumber: string;
      description: string;
      cost: number;
      selling: number;
      qty: number;
      purchased: number;
    }>
  >([]);

  const columns = [
    {
      title: 'Part Number',
      dataIndex: 'partNumber',
      key: 'partNumber'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost'
    },
    {
      title: 'Selling',
      dataIndex: 'selling',
      key: 'selling'
    },
    {
      title: 'Current Qty',
      dataIndex: 'qty',
      key: 'qty'
    },
    {
      title: 'Purchased Qty',
      dataIndex: 'purchased',
      key: 'purchased'
    }
  ];

  const addPurchaseItem = () => {
    setDataSource(prevState => [
      ...prevState,
      {
        key: tableDataKey,
        partNumber,
        description,
        qty: 1,
        purchased,
        selling,
        cost
      }
    ]);
    tableDataKey += 1;
  };
  return (
    <>
      <Card style={{ marginBottom: 15 }}>
        <Form>
          <Item>
            <AutoComplete
              style={{ width: '40vw' }}
              placeholder="Part number"
              onChange={value => {
                setPartNumber(value);
              }}
            />
          </Item>
          <Item>
            <Input
              placeholder="Description"
              onChange={(event: any) => {
                setDescription(event.target.value);
              }}
            />
          </Item>
          <Item>
            <Input
              placeholder="Cost"
              onChange={(event: any) => {
                setCost(event.target.value);
              }}
            />
          </Item>
          <Item>
            <Input
              placeholder="Selling"
              onChange={(event: any) => {
                setSelling(event.target.value);
              }}
            />
          </Item>
          <Item>
            <Input
              placeholder="Qty"
              onChange={(event: any) => {
                setPurchased(event.target.value);
              }}
            />
          </Item>
        </Form>
        <CardActions style={{ float: 'right' }}>
          <Button type={'primary'} onClick={addPurchaseItem}>
            Add
          </Button>
        </CardActions>
      </Card>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default PurchaseItems;
