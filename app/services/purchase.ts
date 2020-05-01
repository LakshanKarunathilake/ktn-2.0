import DBService from './db';
import Purchase from '../models/Purchase';

const db = DBService.getSequelize();

class PurchaseService {
  static getSuppliers() {
    return db.model('Company').findAll({ attributes: ['name'] });
  }

  static addPurchase(purchase: Purchase) {
    return db.model('Purchase').create({
      purchase
    });
  }

  static addPurchaseItems(purchase: Purchase) {
    return db.model('Purchase').bulkCreate([purchase.items]);
  }
}

export default PurchaseService;
