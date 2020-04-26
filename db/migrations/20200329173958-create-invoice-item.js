module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('InvoiceItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Item',
          key: 'code'
        },
        onUpdate: 'CASCADE'
      },
      qty: { type: Sequelize.DECIMAL(4, 2), allowNull: false },
      selling: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      returnedQty: { type: Sequelize.DECIMAL(4, 2), allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
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
    return queryInterface.dropTable('InvoiceItems');
  }
};
