module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('InvoiceItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: { type: Sequelize.STRING, allowNull: false },
      qty: { type: Sequelize.DECIMAL(4, 2), allowNull: false },
      selling: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      returned: { type: Sequelize.DECIMAL(4, 2), allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('InvoiceItems');
  }
};
