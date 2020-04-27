module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'Item',
    {
      code: { type: DataTypes.STRING, unique: true },
      vehicle: { type: DataTypes.STRING, allowNull: true },
      brand: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.STRING },
      stock: { type: DataTypes.DECIMAL(10, 2) },
      cost: { type: DataTypes.DECIMAL(10, 2) },
      selling: { type: DataTypes.DECIMAL(10, 2) },
      location: { type: DataTypes.STRING },
      unit: { type: DataTypes.STRING },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'name'
        },
        onUpdate: 'CASCADE'
      },
      lastUpdated: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'OLD'
      }
    },
    {}
  );
  Item.associate = function(models) {};
  return Item;
};
