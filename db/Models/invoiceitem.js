module.exports = (sequelize, DataTypes) => {
  const InvoiceItem = sequelize.define(
    'InvoiceItem',
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Items',
          key: 'code'
        },
        onUpdate: 'CASCADE'
      },
      qty: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
      selling: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      returned: { type: DataTypes.DECIMAL(4, 2), allowNull: false }
    },
    {}
  );
  InvoiceItem.associate = function(models) {
    // associations can be defined here
    InvoiceItem.belongsTo(models.Invoice, {
      foreignKey: 'invoiceId',
      onUpdate: 'CASCADE'
    });
  };
  return InvoiceItem;
};
