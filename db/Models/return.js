module.exports = (sequelize, DataTypes) => {
  const Return = sequelize.define(
    'Return',
    {
      qty: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
      unit: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      reason: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Return.associate = function(models) {
    // associations can be defined here
    Return.belongsTo(models.Invoice, {
      foreignKey: 'invoiceId',
      onUpdate: 'CASCADE'
    });
    Return.belongsTo(models.Item, {
      foreignKey: 'itemCode',
      onUpdate: 'CASCADE'
    });
  };
  return Return;
};
