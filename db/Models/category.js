import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const Category = sequelize.define(
  'Category',
  {
    name: { type: DataTypes.STRING, unique: true },
    lastUpdated: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'OLD'
    }
  },
  {}
);

export default Category;
