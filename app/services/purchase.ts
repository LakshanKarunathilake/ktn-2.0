import DBService from './db';
import Purchase, { Supplier } from '../models/Purchase';

const sequelize = DBService.getSequelize();

class PurchaseService {
  static getSuppliers() {
    return sequelize.model('Company').findAll({ attributes: ['name'] });
  }

  static getSupplier(name: string) {
    return sequelize.model('Company').findOne({
      where: {
        name
      }
    });
  }

  static addSupplier(supplier: Supplier) {
    return sequelize.model('Company').create({ supplier });
  }

  static addPurchase(purchase: Purchase) {
    return sequelize.model('Purchase').create({
      purchase
    });
  }

  static addPurchaseItems(purchase: Purchase) {
    return sequelize.model('Purchase').bulkCreate([purchase.items]);
  }
}

export default PurchaseService;
