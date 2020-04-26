module.exports = (sequelize, DataTypes) => {
  const Return = sequelize.define(
    'Return',
    {
      itemCode: {
        type: DataTypes.STRING,
        onUpdate: 'CASCADE',
        references: {
          model: 'Items',
          key: 'code',
          as: 'itemCode'
        }
      },
      invoiceId: {
        type: DataTypes.STRING,
        onUpdate: 'CASCADE',
        references: {
          model: 'Invoices',
          key: 'invoice',
          as: 'invoiceId'
        }
      },
      qty: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
      unit: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      reason: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  Return.associate = function(models) {
    // associations can be defined here
  };
  return Return;
};
