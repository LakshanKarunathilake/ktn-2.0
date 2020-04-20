import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';
import { AutoComplete, Select, Input, Form } from 'antd';
import swal from 'sweetalert';
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

const displayConfirmMessage = () => {
  return swal({
    title: 'Confirm Edit',
    text: 'Once deleted, you will not be able to recover this imaginary file!',
    icon: 'warning',
    buttons: ['Cancel', 'Proceed']
  });
};

const CustomerAdd = (props: {
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
  const [editing, setEditing] = useState(false);
  const [error, setErrorState] = useState({
    category: {} as Record<string, any>
  });

  const generateDescription = () => {
    if (addItem.category !== '') {
      updateForm(
        'description',
        `${addItem.category} ${addItem.vehicle} - ${addItem.brand}`
      );
    }
  };
  useEffect(() => {
    generateDescription();
  }, [addItem.vehicle, addItem.brand, addItem.category]);

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

  const clearForm = () => {
    setFormDisabled(true);
    setCodes([]);
    updateFullForm({
      code: '',
      category: '',
      vehicle: '',
      brand: '',
      description: '',
      location: ''
    } as ItemAddView);
  };

  const onCodeSelect = async (itemCode: string) => {
    if ((await displayConfirmMessage()) === true) {
      setFormDisabled(false);
      setEditing(true);
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
    } else {
      clearForm();
      setEditing(false);
    }
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
            title="New Customer"
            subheader="Add new customer to inventory or edit exisiting customer"
          />
          <CardContent>
            <Form layout="vertical">
              <Item help={Tips.code} style={styleClasses.formItem}>
                <AutoComplete
                  options={codes}
                  style={{ width: '40vw' }}
                  onSelect={onCodeSelect}
                  onFocus={() => {
                    clearForm();
                    setEditing(false);
                  }}
                  onSearch={onItemSearch}
                  placeholder="Part number"
                  value={addItem.code}
                  onChange={(value: string) => {
                    updateForm('code', value);
                  }}
                />
              </Item>
              <Item help={Tips.vehicle} style={styleClasses.formItem}>
                <Input
                  placeholder="Name"
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
                  placeholder="Address"
                  disabled={formDisabled}
                  value={addItem.brand}
                  onChange={(event: any) => {
                    updateForm('brand', event.target.value);
                    generateDescription();
                  }}
                />
              </Item>
              <Item help={Tips.location} style={styleClasses.formItem}>
                <Input
                  placeholder="Contact Numbers"
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
            {editing ? (
              <Button
                color="primary"
                variant="contained"
                disabled={error.category.validateStatus !== 'success'}
                onClick={() => {
                  ItemService.editItem(itemInstance, addItem);
                }}
              >
                Edit Item
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                disabled={error.category.validateStatus !== 'success'}
                onClick={async () => {
                  ItemService.addItem(addItem);
                }}
              >
                Add Item
              </Button>
            )}
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

export default CustomerAdd;
