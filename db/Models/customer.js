import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const Customer = sequelize.define(
  'Customer',
  {
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    contactNumber: { type: DataTypes.STRING, allowNull: false },
    note: { type: DataTypes.STRING },
    lastUpdated: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'OLD'
    }
  },
  {}
);

export default Customer;
