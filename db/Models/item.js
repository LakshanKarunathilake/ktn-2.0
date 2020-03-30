module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'Item',
    {
      code: { type: DataTypes.STRING, unique: true },
      vehicle: { type: DataTypes.STRING, allowNull: true },
      brand: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.STRING },
      stock: { type: DataTypes.DECIMAL(4, 2) },
      cost: { type: DataTypes.DECIMAL(10, 2) },
      selling: { type: DataTypes.DECIMAL(10, 2) },
      location: { type: DataTypes.STRING },
      unit: { type: DataTypes.STRING }
    },
    {}
  );
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.Category, {
      foreignKey: 'category',
      onUpdate: 'CASCADE'
    });
  };
  return Item;
};
