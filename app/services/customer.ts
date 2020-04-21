import { QueryTypes } from 'sequelize';
import DBService from './db';

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
}
