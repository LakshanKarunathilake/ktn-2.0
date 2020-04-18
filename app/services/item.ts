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

  static async getCategories() {
    return sequelize.model('Category').findAll({
      attributes: ['name']
    });
  }
}

export default ItemService;
