import Sequelize from 'sequelize';
import config from '../config/config.json';

const env = process.env.NODE_ENV || 'development';

const dbConfig = config[env];

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

export function initializeDB() {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  return sequelize;
}
