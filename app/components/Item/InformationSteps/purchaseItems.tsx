import React, { useState } from 'react';
import {
  AutoComplete,
  Button,
  Card,
  Form,
  Input,
  Table,
  Typography
} from 'antd';
import { CardActions } from '@material-ui/core';
import swal from 'sweetalert';
import ItemService from '../../../services/item';
import Purchase from '../../../models/Purchase';

const { Item } = Form;
const { Text } = Typography;

const PurchaseItems = () => {
  let tableDataKey = 0;
  const [partNumber, setPartNumber] = useState('');
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState();
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

  const [codes, setCodes] = useState<{ value: string }[]>([]);
  const [previousCost, setPreviousCost] = useState();
  const [previousSelling, setPreviousSelling] = useState();

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
        console.log('item', item.description);
        setDescription(item.description);
        setQty(item.stock);
        setPreviousCost(item.cost);
        setPreviousSelling(item.selling);
      })
      .catch((e: any) => console.log('Error', e));
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
    }
  ];

  const addPurchaseItem = (props: {
    purchase: Purchase;
    updateForm: (key: string, value: string) => void;
  }) => {
    const { updateForm, purchase } = props;
    if (dataSource.findIndex(record => record.partNumber === partNumber)) {
      setDataSource(prevState => [
        ...prevState,
        {
          key: tableDataKey,
          partNumber,
          description,
          qty,
          purchased,
          selling,
          cost
        }
      ]);
      tableDataKey += 1;
    } else {
      swal('Warning', 'You are trying to add the same item again', 'warning');
    }
  };
  return (
    <>
      <Card style={{ marginBottom: 15 }}>
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
              onChange={(event: any) => {
                setCost(event.target.value);
              }}
            />
            {previousCost && <Text>{previousCost}</Text>}
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
            />
            {previousSelling && <Text>{previousSelling}</Text>}
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
            {qty && <Text>{qty}</Text>}
          </Item>
        </Form>
        <CardActions style={{ float: 'right' }}>
          <Button type={'primary'} onClick={addPurchaseItem}>
            Add
          </Button>
        </CardActions>
      </Card>
      <Table
        size={'small'}
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default PurchaseItems;
