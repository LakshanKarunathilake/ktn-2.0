module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice: { type: Sequelize.STRING, allowNull: false, unique: true },
      total: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      discount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      grand: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      credit: { type: Sequelize.BOOLEAN, allowNull: false },
      returned: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      note: { type: Sequelize.STRING },
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
    return queryInterface.dropTable('Invoices');
  }
};
