import DBService from './db';

class ItemService {
  static getPartNumbers() {
    const sequelize = DBService.getSequelize();
    sequelize.model('Item').findAll({
      attributes: ['id', 'code']
    });
  }
}

export default ItemService;
