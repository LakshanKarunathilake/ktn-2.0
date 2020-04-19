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

  static async getItem(code: string) {
    try {
      const item = await sequelize.model('Item').findOne({
        where: {
          code
        }
      });
      return item;
    } catch (e) {
      console.log('Error in getting item', e);
    }
    return null;
  }
}

export default ItemService;
