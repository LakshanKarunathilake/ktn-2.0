import React, { useEffect, useState } from 'react';
import {
  AutoComplete,
  Button,
  Card,
  Form,
  Input,
  Table,
  Typography,
  notification
} from 'antd';
import { CardActions } from '@material-ui/core';
import swal from 'sweetalert';
import { DeleteOutlined } from '@ant-design/icons';
import _ from 'lodash';
import ItemService from '../../../services/item';
import Purchase, { PurchaseItem } from '../../../models/Purchase';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

const { Item } = Form;
const { Text, Title } = Typography;

const PurchaseItems = (props: {
  purchase: Purchase;
  updateForm: (key: string, value: any) => void;
}) => {
  const { updateForm, purchase } = props;
  const [partNumber, setPartNumber] = useState('');
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState();
  const [selling, setSelling] = useState(0.0);
  const [cost, setCost] = useState(0.0);
  const [purchased, setPurchased] = useState(0);
  const [codes, setCodes] = useState<{ value: string }[]>([]);
  const [previousCost, setPreviousCost] = useState();
  const [previousSelling, setPreviousSelling] = useState();
  const [invoiceBalance, setInvoiceBalance] = useState('0.00');

  const onItemSearch = (searchText: string) => {
    if (searchText !== '') {
      ItemService.getPartNumbers(searchText)
        .then((val: any) => {
          const updated = val.map((v: any) => {
            return { value: v.code };
          });
          return setCodes(updated);
        })
        .catch((e: any) => {
          console.log('error', e);
        });
    } else {
      setCodes([]);
    }
  };

  const onItemSelect = (code: string) => {
    ItemService.getItem(code)
      .then((item: any) => {
        setDescription(item.description);
        setQty(item.stock);
        setPreviousCost(item.cost);
        setPreviousSelling(item.selling);
      })
      .catch((e: any) => console.log('Error', e));
  };

  const deletePurchaseItem = (row: PurchaseItem) => {
    updateForm(
      'items',
      purchase.items.filter(val => val.key !== row.key)
    );
  };

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
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (row: PurchaseItem) => (
        <Button
          onClick={() => {
            deletePurchaseItem(row);
          }}
          icon={<DeleteOutlined />}
        />
      )
    }
  ];

  const addPurchaseItem = () => {
    if (
      purchase.items &&
      purchase.items.findIndex(record => record.partNumber === partNumber)
    ) {
      updateForm('items', [
        ...purchase.items,
        {
          key: purchase.items.length > 0 ? purchase.items[0].key + 1 : 0,
          partNumber,
          description,
          qty,
          purchased,
          selling,
          cost
        }
      ]);
    } else {
      swal('Warning', 'You are trying to add the same item again', 'warning');
    }
  };

  useEffect(() => {
    setInvoiceBalance(
      _.sum(
        purchase.items.map((record: PurchaseItem) => {
          return record.cost * record.purchased;
        })
      ).toFixed(2)
    );
  });

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Card style={{ marginBottom: 15, width: '70%' }}>
          <Form>
            <Item>
              <AutoComplete
                style={{ width: '40vw' }}
                placeholder="Part number"
                options={codes}
                onSearch={onItemSearch}
                onChange={value => {
                  setPartNumber(value);
                }}
                onSelect={onItemSelect}
              />
            </Item>
            <Item>
              <Input
                placeholder="Description"
                value={description}
                onChange={(event: any) => {
                  setDescription(event.target.value);
                }}
              />
            </Item>
            <Item>
              <Input
                placeholder="Cost"
                addonBefore="Rs."
                style={{ width: '40vw', marginRight: 20 }}
                value={cost === 0 ? '' : cost}
                onBlur={() => {
                  if (cost > previousCost) {
                    notification.warning({
                      message: 'Cost Price',
                      description: 'New cost price is INCREASED',
                      placement: 'bottomRight',
                      icon: <RiseOutlined />
                    });
                  } else {
                    notification.warning({
                      message: 'Cost Price',
                      description: 'New cost price is DECREASED',
                      placement: 'bottomRight',
                      icon: <FallOutlined />
                    });
                  }
                }}
                onChange={(event: any) => {
                  setCost(event.target.value);
                }}
              />
              {previousCost && (
                <Text type="warning" strong>
                  {previousCost}
                </Text>
              )}
            </Item>
            <Item>
              <Input
                style={{ width: '40vw', marginRight: 20 }}
                addonBefore="Rs."
                placeholder="Selling"
                value={selling === 0 ? '' : selling}
                onChange={(event: any) => {
                  setSelling(event.target.value);
                }}
                onBlur={() => {
                  if (selling > previousSelling) {
                    notification.warning({
                      message: 'Selling Price',
                      description: 'New selling price is INCREASED',
                      placement: 'bottomRight',
                      icon: <RiseOutlined />
                    });
                  } else {
                    notification.warning({
                      message: 'Selling Price',
                      description: 'New selling price is DECREASED',
                      placement: 'bottomRight',
                      icon: <FallOutlined />
                    });
                  }
                }}
              />
              {previousSelling && (
                <Text type="warning" strong>
                  {previousSelling}
                </Text>
              )}
            </Item>
            <Item>
              <Input
                style={{ width: '20vw', marginRight: 20 }}
                placeholder="Qty"
                value={purchased === 0 ? '' : purchased}
                onChange={(event: any) => {
                  setPurchased(event.target.value);
                }}
              />
              {qty && (
                <Text type="warning" strong>
                  {qty}
                </Text>
              )}
            </Item>
          </Form>
          <CardActions style={{ float: 'right' }}>
            <Button type="primary" onClick={addPurchaseItem}>
              Add
            </Button>
          </CardActions>
        </Card>
        <Card
          style={{
            width: '30%',
            height: '100%',
            marginLeft: 15
          }}
        >
          <>
            <Title level={4} type="secondary">
              Invoice balance
            </Title>
            <Text
              style={{
                color: '#1890ff',
                fontSize: 24,
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              Rs. {parseFloat(purchase.total).toFixed(2)}
            </Text>
          </>
          <>
            <Title level={4} type="secondary">
              Pending balance
            </Title>
            <Text style={{ color: '#faad14', fontSize: 24, float: 'right' }}>
              Rs. {invoiceBalance}
            </Text>
          </>
        </Card>
      </div>

      <Table
        size="small"
        dataSource={purchase.items}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default PurchaseItems;
