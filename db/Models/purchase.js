import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const Purchase = sequelize.define(
  'Purchase',
  {
    invoiceNo: { type: DataTypes.STRING, allowNull: false, unique: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    lastUpdated: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'OLD'
    },
    companyId: {
      type: DataTypes.STRING,
      onUpdate: 'CASCADE',
      references: {
        model: 'Companies',
        key: 'id',
        as: 'companyId'
      }
    }
  },
  {}
);

export default Purchase;
