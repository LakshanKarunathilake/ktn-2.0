module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define(
    'Purchase',
    {
      number: { type: DataTypes.STRING, allowNull: false, unique: true },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      lastUpdated: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'OLD'
      }
    },
    {}
  );
  Purchase.associate = function(models) {
    // associations can be defined here
    Purchase.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onUpdate: 'CASCADE'
    });
  };
  return Purchase;
};
