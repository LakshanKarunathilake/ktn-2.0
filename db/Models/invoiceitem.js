import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const InvoiceItem = sequelize.define(
  'InvoiceItem',
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Items',
        key: 'code'
      },
      onUpdate: 'CASCADE'
    },
    qty: { type: DataTypes.DECIMAL(6, 2), allowNull: false },
    returnedQty: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
    selling: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    lastUpdated: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'OLD'
    },
    invoiceId: {
      type: DataTypes.STRING,
      onUpdate: 'CASCADE',
      references: {
        model: 'Invoices',
        key: 'invoice',
        as: 'invoiceId'
      }
    }
  },
  {}
);

export default InvoiceItem;
