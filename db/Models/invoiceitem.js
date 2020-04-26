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
      qty: { type: DataTypes.DECIMAL(6, 2), allowNull: false },
      returnedQty: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
      selling: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      invoiceId: {
        type: DataTypes.STRING,
        onUpdate: 'CASCADE',
        references: {
          model: 'Invoices',
          key: 'invoice',
          as: 'invoiceId'
        }
      }
    },
    {}
  );
  InvoiceItem.associate = function(models) {
    // associations can be defined here
  };
  return InvoiceItem;
};
