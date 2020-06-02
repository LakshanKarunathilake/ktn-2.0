module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Purchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoiceNo: { type: Sequelize.STRING, allowNull: false, unique: true },
      date: { type: Sequelize.DATEONLY, allowNull: false },
      total: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      companyId: {
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        references: {
          model: 'Companies',
          key: 'id',
          as: 'companyId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Purchases');
  }
};
