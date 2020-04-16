import DBService from './db';
import { QueryTypes } from 'sequelize';

class ItemService {
  static getPartNumbers() {
    const sequelize = DBService.getSequelize();
    // return sequelize.model('Item').findAll({
    //   attributes: ['code'],
    //   limit: 5000
    // });
    return sequelize.query('Select code from Items', {
      type: QueryTypes.SELECT
    });
  }
}

export default ItemService;
