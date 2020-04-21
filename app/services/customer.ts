import { QueryTypes } from 'sequelize';
import DBService from './db';

const sequelize = DBService.getSequelize();

export default class CustomerService {
  static getCustomers(name: string) {
    return sequelize.query(
      `Select name from Users where name like '${name}%'`,
      {
        type: QueryTypes.SELECT
      }
    );
  }
}
