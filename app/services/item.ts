import { QueryTypes } from 'sequelize';
import swal from 'sweetalert';
import DBService from './db';
import { ItemAddView } from '../models/User';

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

  static async addItem(item: ItemAddView) {
    console.log('i', item);
    sequelize
      .model('Item')
      .create({
        code: item.code,
        category: item.category,
        description: item.description,
        unit: item.unit,
        vehicle: item.vehicle,
        brand: item.brand
      })
      .then(() => {
        return swal('Item Add', 'Item successfully added', 'success');
      })
      .catch((e: any) => {
        console.log('Error in Item add', e);
        return swal('Item Add', 'Item adding failure', 'error');
      });
  }

  static async editItem(item: any, itemValues: ItemAddView) {
    item.update({
      category: itemValues.category,
      vehicle: itemValues.vehicle,
      brand: itemValues.brand,
      description: itemValues.description,
      unit: itemValues.unit,
      location: itemValues.location
    });
    item
      .save()
      .then(() => {
        return swal('Item Update', 'Item successfully changed', 'success');
      })
      .catch((e: any) => {
        console.log('Error in Item update', e);
        return swal('Item Update', 'Item updating failure', 'error');
      });
  }
}

export default ItemService;
