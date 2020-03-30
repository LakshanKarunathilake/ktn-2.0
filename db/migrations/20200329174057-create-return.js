'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Returns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qty: { type: Sequelize.DECIMAL(4, 2), allowNull: false },
      unit: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      reason: { type: Sequelize.STRING, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      itemCode: {
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        references: {
          model: 'Items',
          key: 'code',
          as: 'itemCode'
        }
      },
      invoiceId: {
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        references: {
          model: 'Invoices',
          key: 'invoice',
          as: 'invoiceId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Returns');
  }
};
