import DBService from './db';

const db = DBService.getSequelize();

class PurchaseService {
  static getSuppliers() {
    return db.model('Company').findAll({ attributes: ['name'] });
  }
}

export default PurchaseService;
