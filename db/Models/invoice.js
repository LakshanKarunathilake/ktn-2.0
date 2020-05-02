module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    'Invoice',
    {
      invoice: { type: DataTypes.STRING, allowNull: false, unique: true },
      total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
      },
      grand: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      credit: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      note: { type: DataTypes.STRING },
      lastUpdated: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'OLD'
      }
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
