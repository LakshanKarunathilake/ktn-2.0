import Sequelize from 'sequelize';
import moment from 'moment';
import Purchase, { Supplier } from '../models/Purchase';
import GeneralCache from '../cache/GeneralCache';
import Company from '../../db/Models/company';
import PurchaseTable from '../../db/Models/purchase';
import { sequelize } from '../../db/Models/index';

class PurchaseService {
  static getSuppliers() {
    return Company.findAll({ attributes: ['name', 'id'] });
  }

  static getSupplier(name: string) {
    return Company.findOne({
      where: {
        name
      }
    });
  }

  static addSupplier(supplier: Supplier) {
    return Company.create({ ...supplier });
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

  static async addPurchase(purchase: Purchase) {
    const { invoiceNo, companyId, items, date, total } = purchase;
    const purchaseOverallData = {
      invoiceNo,
      companyId: companyId.key,
      date: moment(date).format('YYYY-MM-DD HH:mm:ss'),
      total
    };
    console.log(purchaseOverallData);
    try {
      await sequelize.transaction(async (t: Sequelize.Transaction) => {
        await sequelize
          .model('Purchase')
          .create({ ...purchaseOverallData }, { transaction: t });
      });
    } catch (e) {
      console.log('error', e);
    }
  }

  static addPurchaseItems(purchase: Purchase) {
    return PurchaseTable.bulkCreate([purchase.items]);
  }
}

export default PurchaseService;
