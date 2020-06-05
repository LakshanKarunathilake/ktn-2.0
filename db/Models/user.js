import { DataTypes } from 'sequelize';
import { getSequelize } from './index';

const User = getSequelize().define(
  'User',
  {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    salt: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.INTEGER, allowNull: false }
  },
  {}
);

export default User;
