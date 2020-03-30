module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    'Payment',
    {
      paidDate: { type: DataTypes.DATE, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      bank: { type: DataTypes.STRING },
      chequeDate: { type: DataTypes.STRING },
      chequeNumber: { type: DataTypes.STRING },
      amount: { type: DataTypes.STRING }
    },
    {}
  );
  Payment.associate = function(models) {
    // associations can be defined here
    Payment.belongsTo(models.Invoice, {
      foreignKey: 'invoiceId',
      onUpdate: 'CASCADE'
    });
  };
  return Payment;
};
