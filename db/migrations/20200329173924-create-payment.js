module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paidDate: { type: Sequelize.TIMESTAMP, allowNull: false },
      type: { type: Sequelize.STRING, allowNull: false },
      bank: { type: Sequelize.STRING },
      chequeDate: { type: Sequelize.STRING },
      chequeNumber: { type: Sequelize.STRING },
      amount: { type: Sequelize.STRING },
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
    return queryInterface.dropTable('Payments');
  }
};
