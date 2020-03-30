module.exports = (sequelize, DataTypes) => {
  const PurchaseItem = sequelize.define(
    'PurchaseItem',
    {
      qty: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
      bill: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      selling: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    },
    {}
  );
  PurchaseItem.associate = function(models) {
    // associations can be defined here
    PurchaseItem.belongsTo(models.Item, {
      foreignKey: 'itemCode',
      onUpdate: 'CASCADE'
    });
    PurchaseItem.belongsTo(models.Purchase,{
      foreignKey: 'billNumber',
      onUpdate: 'CASCADE'
    });
  };
  return PurchaseItem;
};
