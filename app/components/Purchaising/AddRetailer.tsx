import React, { useEffect, useState } from 'react';
import { Card, Typography, Form, AutoComplete, Input, Button } from 'antd';
import swal from 'sweetalert';
import PurchaseService from '../../services/purchase';

const { Text, Title } = Typography;
const { Item } = Form;

const AddRetailer = () => {
  const [names, setNames] = useState<{ value: string }[]>([]);
  const [allNames, setAllNames] = useState<{ value: string }[]>([]);
  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [editing, setEditing] = useState(true);
  const [formaDisable, setFormDisable] = useState(true);
  const [supplierInstance, setSupplierInstance] = useState(true);

  const getSuppliers = () => {
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
  };
  useEffect(() => getSuppliers(), []);

  const onItemSearch = (searchText: string) => {
    if (searchText !== '') {
      const similarRecords = allNames.filter(value =>
        value.value.toUpperCase().includes(searchText.toUpperCase())
      );
      if (similarRecords.length > 0) {
        setNames(similarRecords);
      } else {
        setNames([]);
        setEditing(false);
        setFormDisable(false);
      }
    }
  };

  const displayConfirmMessage = () => {
    return swal({
      title: 'Confirm Edit',
      text:
        'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: ['Cancel', 'Proceed']
    });
  };

  const clearForm = () => {
    setName('');
    setAddress('');
    setContactNumber('');
  };

  const onSupplierSelect = async (value: string) => {
    if ((await displayConfirmMessage()) === true) {
      setFormDisable(false);
      setEditing(true);
      const supplier = await PurchaseService.getSupplier(value);
      setSupplierInstance(supplier);
      setAddress(supplier.address);
      setContactNumber(supplier.contactNumber);
    } else {
      clearForm();
      setEditing(false);
    }
  };

  return (
    <>
      <Card style={{ marginBottom: 20 }}>
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
            onSelect={onSupplierSelect}
            value={name}
            onChange={val => setName(val)}
            placeholder="Retailer Name"
          />
        </Item>
        <Item>
          <Input
            style={{ marginRight: 20, width: '60vw' }}
            placeholder="Address"
            value={address}
            disabled={formaDisable}
            onChange={(event: any) => {
              setAddress(event.target.value);
            }}
          />
        </Item>
        <Item>
          <Input
            style={{ marginRight: 20, width: '60vw' }}
            placeholder="Contact Numbers"
            value={contactNumber}
            disabled={formaDisable}
            onChange={(event: any) => {
              setContactNumber(event.target.value);
            }}
          />
        </Item>
      </Form>
      <section>
        {!editing && (
          <Button
            style={{ margin: 5 }}
            type="primary"
            disabled={address === '' && contactNumber === ''}
            onClick={() => {
              console.log('val', name, address, contactNumber);
              PurchaseService.addSupplier({ name, address, contactNumber })
                .then(() => {
                  return swal(
                    'Successful',
                    `Supplier ${name} added successfully to database`,
                    'success'
                  );
                })
                .then(() => {
                  getSuppliers();
                  return clearForm();
                })
                .catch((e: any) => {
                  swal('Failure', `Supplier ${name} adding failure`, 'error');
                });
            }}
          >
            Add
          </Button>
        )}
        {editing && (
          <Button
            style={{ margin: 5 }}
            disabled={address === '' && contactNumber === ''}
            onClick={() =>
              PurchaseService.editSupplier(supplierInstance, {
                name,
                address,
                contactNumber
              })
                .then(() => {
                  return swal(
                    'Item Update',
                    'Item successfully changed',
                    'success'
                  );
                })
                .then(() => {
                  setEditing(false);
                  clearForm();
                })
                .catch((e: any) => {
                  console.log('Error in Item update', e);
                  return swal('Item Update', 'Item updating failure', 'error');
                })
            }
          >
            Update
          </Button>
        )}
        <Button style={{ margin: 5 }} type="danger" onClick={clearForm}>
          Cancel
        </Button>
      </section>
    </>
  );
};

export default AddRetailer;
