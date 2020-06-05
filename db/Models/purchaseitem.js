import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const PurchaseItem = sequelize.define(
  'PurchaseItem',
  {
    qty: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
    bill: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    selling: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    lastUpdated: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'OLD'
    },
    itemCode: {
      type: DataTypes.STRING,
      onUpdate: 'CASCADE',
      references: {
        model: 'Items',
        key: 'code',
        as: 'itemCode'
      }
    },
    invoiceNo: {
      type: DataTypes.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Purchases',
        key: 'invoiceNo',
        as: 'invoiceNo'
      }
    }
  },
  {}
);

export default PurchaseItem;
