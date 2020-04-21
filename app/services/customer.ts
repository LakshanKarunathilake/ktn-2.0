import { QueryTypes } from 'sequelize';
import DBService from './db';
import swal from 'sweetalert';
import { Customer } from '../models/Customer';

const sequelize = DBService.getSequelize();

export default class CustomerService {
  static getCustomers(name: string) {
    return sequelize.query(
      `Select name from Customers where name like '${name}%'`,
      {
        type: QueryTypes.SELECT
      }
    );
  }

  static async getCustomer(name: string) {
    try {
      const customer = await sequelize.model('Customer').findOne({
        where: {
          name
        }
      });
      return customer;
    } catch (e) {
      console.log('Error in getting item', e);
    }
    return null;
  }

  static async addCustomer(customer: Customer) {
    sequelize
      .model('Customer')
      .create({
        name: customer.name,
        address: customer.address,
        contactNumber: customer.contactNumber
      })
      .then(() => {
        return swal('Customer Add', 'Customer successfully added', 'success');
      })
      .catch((e: any) => {
        console.log('Error in Customer add', e);
        return swal('Customer Add', 'Customer adding failure', 'error');
      });
  }

  static async editCustomer(customer: any, customerValues: Customer) {
    customer.update({
      address: customerValues.address,
      contactNumber: customerValues.contactNumber
    });
    customer
      .save()
      .then(() => {
        return swal(
          'Customer Update',
          'Customer successfully changed',
          'success'
        );
      })
      .catch((e: any) => {
        console.log('Error in Customer update', e);
        return swal('Customer Update', 'Customer updating failure', 'error');
      });
  }
}
