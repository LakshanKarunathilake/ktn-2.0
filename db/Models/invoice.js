import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const Invoice = sequelize.define(
  'Invoice',
  {
    invoice: { type: DataTypes.STRING, allowNull: false, unique: true },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0
    },
    grand: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    credit: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    note: { type: DataTypes.STRING },
    lastUpdated: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'OLD'
    },
    customerId: {
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Customers',
        key: 'id',
        as: 'customerId'
      }
    }
  },
  {}
);

export default Invoice;
