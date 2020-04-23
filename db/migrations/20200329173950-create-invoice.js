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
      discount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
      },
      grand: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      credit: { type: Sequelize.BOOLEAN, allowNull: false },
      note: { type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      customerId: {
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        references: {
          model: 'Customers',
          key: 'id',
          as: 'customerCode'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Invoices');
  }
};
