import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const Company = sequelize.define(
  'Company',
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
    contactNumber: { type: DataTypes.STRING, allowNull: false },
    lastUpdated: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'OLD'
    }
  },
  {}
);

export default Company;
