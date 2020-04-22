import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core';
import { AutoComplete, Input, Form } from 'antd';
import swal from 'sweetalert';
import CustomerService from '../../services/customer';
import { Customer } from '../../models/Customer';

const { TextArea } = Input;
const { Item } = Form;

const Tips = {
  code:
    'If you are adding new item make sure that doesnt exist. Use CAPITAL letters',
  address: 'Separate address lines with comma',
  brand: 'Make of the item, leave empty if unknown',
  contact: 'Leave empty if unknown'
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
  addCustomer: Customer;
  formDisabled: boolean;
  updateForm: (key: string, value: string) => void;
  updateFullForm: (values: Customer) => void;
  setFormDisabled: (value: boolean) => void;
}) => {
  const {
    updateForm,
    addCustomer,
    updateFullForm,
    setFormDisabled,
    formDisabled
  } = props;
  console.log('props', props);

  const [names, setNames] = useState<{ value: string }[]>([]);
  const [customerInstance, setCustomerInstance] = useState();
  const [editing, setEditing] = useState(false);
  const [error, setErrorState] = useState(true);

  const onUserSearch = (searchText: string) => {
    if (searchText !== '') {
      CustomerService.getCustomers(searchText)
        .then((val: any) => {
          const updated = val.map((v: any) => {
            return { value: v.name };
          });
          return setNames(updated);
        })
        .catch((e: any) => {
          console.log('error', e);
        });
    }
  };

  const clearForm = () => {
    setFormDisabled(true);
    setNames([]);
    updateFullForm({
      name: '',
      address: '',
      contactNumber: '',
      note: ''
    } as Customer);
  };

  const onCodeSelect = async (nameValue: string) => {
    if ((await displayConfirmMessage()) === true) {
      setFormDisabled(false);
      setEditing(true);
      const user: Customer = await CustomerService.getCustomer(nameValue);
      setCustomerInstance(user);
      const { name, contactNumber, address, note } = user;
      const userValues: Customer = {
        name,
        contactNumber,
        address,
        note
      };
      updateFullForm(userValues);
    } else {
      clearForm();
      setEditing(false);
    }
  };

  useEffect(() => {
    console.log('updating');
    if (addCustomer.contactNumber !== '' && addCustomer.contactNumber !== '') {
      setErrorState(false);
    }
  }, [addCustomer]);
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
                  options={names}
                  style={{ width: '40vw' }}
                  onSelect={onCodeSelect}
                  onFocus={() => {
                    clearForm();
                    setEditing(false);
                  }}
                  onSearch={onUserSearch}
                  placeholder="Customer name"
                  value={addCustomer.name}
                  onChange={(value: string) => {
                    updateForm('name', value);
                  }}
                />
              </Item>
              <Item help={Tips.address} style={styleClasses.formItem}>
                <Input
                  placeholder="Address"
                  disabled={formDisabled}
                  value={addCustomer.address}
                  onChange={(event: any) => {
                    updateForm('address', event.target.value);
                  }}
                />
              </Item>
              <Item help={Tips.brand} style={styleClasses.formItem}>
                <Input
                  placeholder="Contact Numbers"
                  disabled={formDisabled}
                  value={addCustomer.contactNumber}
                  onChange={(event: any) => {
                    updateForm('contactNumber', event.target.value);
                  }}
                />
              </Item>
              <Item help={Tips.contact} style={styleClasses.formItem}>
                <TextArea
                  rows={4}
                  placeholder="Additional Note Related to customer"
                  disabled={formDisabled}
                  value={addCustomer.note}
                  onChange={(event: any) => {
                    console.log('event', event.target.value);
                    updateForm('note', event.target.value);
                  }}
                />
              </Item>
            </Form>
          </CardContent>
          <CardActions style={{ float: 'right' }}>
            {editing ? (
              <Button
                color="primary"
                variant="contained"
                disabled={error}
                onClick={() => {
                  CustomerService.editCustomer(customerInstance, addCustomer);
                }}
              >
                Update Customer
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                disabled={error}
                onClick={() => {
                  CustomerService.addCustomer(addCustomer);
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
