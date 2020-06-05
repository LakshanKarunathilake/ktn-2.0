import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const Payment = sequelize.define(
  'Payment',
  {
    paidDate: { type: DataTypes.DATE, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    bank: { type: DataTypes.STRING },
    chequeDate: { type: DataTypes.STRING },
    chequeNumber: { type: DataTypes.STRING },
    amount: { type: DataTypes.STRING },
    lastUpdated: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'OLD'
    },
    invoiceId: {
      type: DataTypes.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Invoices',
        key: 'invoice',
        as: 'invoiceId'
      }
    }
  },
  {}
);

export default Payment;
