module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: { type: Sequelize.STRING, unique: true },
      category: {
        type: Sequelize.STRING,
        references: {
          model: 'Category',
          key: 'name',
          as: 'category'
        },
        onUpdate: 'CASCADE'
      },
      vehicle: { type: Sequelize.STRING, allowNull: true },
      brand: { type: Sequelize.STRING, allowNull: true },
      description: { type: Sequelize.STRING },
      stock: { type: Sequelize.DECIMAL(4, 2) },
      cost: { type: Sequelize.DECIMAL(10, 2) },
      selling: { type: Sequelize.DECIMAL(10, 2) },
      location: { type: Sequelize.STRING },
      unit: { type: Sequelize.STRING },
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
    return queryInterface.dropTable('Items');
  }
};
