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

  static async getLatestCustomers() {
    try {
      const customers = await sequelize.model('Customer').findAll({
        limit: 3
      });
      return customers;
    } catch (e) {
      console.log('Error caught while getting latest customers', e);
    }
    return 0;
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
      .create(customer)
      .then(() => {
        return swal('Customer Add', 'Customer successfully added', 'success');
      })
      .catch((e: any) => {
        console.log('Error in Customer add', e);
        return swal('Customer Add', 'Customer adding failure', 'error');
      });
  }

  static async editCustomer(customer: any, customerValues: Customer) {
    const { address, contactNumber, note } = customerValues;
    customer.update({
      address,
      contactNumber,
      note
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
