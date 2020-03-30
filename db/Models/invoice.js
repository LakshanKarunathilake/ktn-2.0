module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    'Invoice',
    {
      invoice: { type: DataTypes.STRING, allowNull: false, unique: true },
      total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      discount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      grand: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      credit: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      returned: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      note: { type: DataTypes.STRING }
    },
    {}
  );
  Invoice.associate = function(models) {
    // associations can be defined here
    Invoice.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      onUpdate: 'CASCADE'
    });
  };
  return Invoice;
};
