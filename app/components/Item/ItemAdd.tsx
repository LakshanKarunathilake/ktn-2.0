import React, { useEffect, useState } from 'react';
import {
  Card,
  TextField,
  CardHeader,
  CardContent,
  Box,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';
import { AutoComplete, Select, Input, Form } from 'antd';
import ItemService from '../../services/item';
import { ItemAddView } from '../../models/User';

const { Option } = Select;
const { Item } = Form;

const Tips = {
  code:
    'If you are adding new item make sure that doesnt exist. Use - instead of space and use CAPITAL letters',
  category: 'Not allowed to enter new category have to use existing category',
  vehicle: 'Applicable vehicle if exist, if vehicle is common leave it empty',
  brand: 'Make of the item, leave empty if unknown',
  unit:
    'Pcs is default unit, Set is for selling a set as single, use rest for measuring items',
  location: 'Leave empty if unknown'
};

const styleClasses = {
  formItem: { marginTop: '15px', marginBottom: '15px' }
};

const ItemAdd = (props: {
  addItem: ItemAddView;
  formDisabled: boolean;
  updateForm: (key: string, value: string) => void;
  updateFullForm: (values: ItemAddView) => void;
  setFormDisabled: (value: boolean) => void;
}) => {
  const {
    updateForm,
    addItem,
    updateFullForm,
    setFormDisabled,
    formDisabled
  } = props;

  const [codes, setCodes] = useState<{ value: string }[]>([]);
  const [categories, setCategories] = useState<{ value: string }[]>([]);
  const [itemInstance, setItemInstance] = useState();
  const generateDescription = () => {
    updateForm(
      'description',
      `${addItem.category} ${addItem.vehicle} - ${addItem.brand}`
    );
  };
  useEffect(() => {
    generateDescription();
  }, [addItem.vehicle, addItem.brand, addItem.category]);

  const onItemSearch = (searchText: string) => {
    if (searchText !== '') {
      ItemService.getPartNumbers(searchText)
        .then((val: any) => {
          const updated = val.map(v => {
            return { value: v.code };
          });
          setCodes(updated);
        })
        .catch((e: any) => {
          console.log('error', e);
        });
    }
  };

  const onCategorySearch = (searchText: string) => {
    console.log('sear', searchText);
    ItemService.getCategories(searchText)
      .then((val: any) => {
        const updated = val.map(v => {
          return { value: v.name };
        });
        console.log('updae', updated);
        setCategories(updated);
      })
      .catch((e: any) => {
        console.log('error', e);
      });
  };

  const onCodeSelect = async (itemCode: string) => {
    setFormDisabled(false);
    const item = await ItemService.getItem(itemCode);
    setItemInstance(item);
    const {
      code,
      description,
      brand,
      vehicle,
      unit,
      location,
      category
    } = item;
    const itemValues: ItemAddView = {
      code,
      description,
      brand,
      vehicle,
      unit,
      location: !location ? '' : location,
      category
    };
    updateFullForm(itemValues);
  };
  const onCategorySelect = (itemCode: string) => {
    setFormDisabled(false);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Card
          variant="outlined"
          style={{
            margin: '15px',
            width: '70%'
          }}
        >
          <CardHeader
            title="New Item"
            subheader="Add new item to inventory or edit exisiting item"
          />
          <CardContent>
            <Form layout="vertical">
              <Item help={Tips.code} style={styleClasses.formItem}>
                <AutoComplete
                  options={codes}
                  style={{ width: '40vw' }}
                  onSelect={onCodeSelect}
                  onSearch={onItemSearch}
                  placeholder="Part number"
                  value={addItem.code}
                  onChange={(value: string) => {
                    updateForm('code', value);
                  }}
                />
              </Item>
              <Item help={Tips.category} style={styleClasses.formItem}>
                <AutoComplete
                  options={categories}
                  style={{ width: '40vw' }}
                  onSelect={onCategorySelect}
                  onSearch={onCategorySearch}
                  placeholder="Category"
                  disabled={formDisabled}
                  allowClear
                  value={addItem.category}
                  onChange={(value: string) => {
                    updateForm('category', value);
                    generateDescription();
                  }}
                />
              </Item>
              <Item help={Tips.vehicle} style={styleClasses.formItem}>
                <Input
                  placeholder="Vehicle"
                  disabled={formDisabled}
                  value={addItem.vehicle}
                  onChange={(event: any) => {
                    updateForm('vehicle', event.target.value);
                    generateDescription();
                  }}
                />
              </Item>
              <Item help={Tips.brand} style={styleClasses.formItem}>
                <Input
                  placeholder="Brand"
                  disabled={formDisabled}
                  value={addItem.brand}
                  onChange={(event: any) => {
                    updateForm('brand', event.target.value);
                    generateDescription();
                  }}
                />
              </Item>
              <Item style={styleClasses.formItem}>
                <Input
                  disabled
                  placeholder="Description value will be auto generated"
                  value={addItem.description}
                />
              </Item>
              <Item help={Tips.unit} style={styleClasses.formItem}>
                <Select
                  defaultValue="Pcs"
                  style={{ width: 120 }}
                  value={addItem.unit}
                  onChange={(value: any) => {
                    updateForm('unit', value);
                  }}
                >
                  <Option value="Pcs">Pcs</Option>
                  <Option value="Feet">Feet</Option>
                  <Option value="Set">Set</Option>
                  <Option value="Meter">Meter</Option>
                </Select>
              </Item>
              <Item help={Tips.location} style={styleClasses.formItem}>
                <Input
                  placeholder="Location"
                  disabled={formDisabled}
                  value={addItem.location}
                  onChange={(event: any) => {
                    console.log('event', event.target.value);
                    updateForm('location', event.target.value);
                  }}
                />
              </Item>
            </Form>
            <Box p={2}>
              <Typography>
                Please not that by default quantity will be 0, selling price
                will be 0.00 and cost will be 0.00
              </Typography>
            </Box>
          </CardContent>
          <CardActions style={{ float: 'right' }}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                console.log('saving', addItem);
              }}
            >
              Add Item
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                console.log('saving', addItem);
              }}
            >
              Edit Item
            </Button>
            <Button color="secondary" variant="contained">
              Cancel
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined" style={{ margin: '15px', width: '30%' }}>
          <CardHeader
            title="History of Additions"
            subheader="Click to revert the item addition"
          />
        </Card>
      </div>
      <Card variant="outlined" style={{ margin: '15px', height: '30%' }}></Card>
    </>
  );
};

export default ItemAdd;
