import { QueryTypes } from 'sequelize';
import DBService from './db';

const sequelize = DBService.getSequelize();

class ItemService {
  static getPartNumbers(value: string) {
    return sequelize.query(
      `Select code from Items where code like '${value}%'`,
      {
        type: QueryTypes.SELECT
      }
    );
  }

  static getCategories(value: string) {
    return sequelize.query(
      `Select name from Categories where name like '${value}%'`,
      {
        type: QueryTypes.SELECT
      }
    );
  }

  static getItem(code: string) {
    return sequelize.model('Category').findAll({
      attributes: ['name']
    });
  }
}

export default ItemService;
