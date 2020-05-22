import DBService from './db';
import Purchase, { Supplier } from '../models/Purchase';
import GeneralCache from '../cache/GeneralCache';

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
    return sequelize.model('Company').create({ ...supplier });
  }

  static async editSupplier(supplier: any, supplierValues: Supplier) {
    const user = GeneralCache.getValue('user');
    supplier.update({
      address: supplierValues.address,
      contactNumber: supplierValues.contactNumber,
      lastUpdated: user.name
    });
    return supplier.save();
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
