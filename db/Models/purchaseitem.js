'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseItem = sequelize.define('PurchaseItem', {
    name: DataTypes.STRING
  }, {});
  PurchaseItem.associate = function(models) {
    // associations can be defined here
  };
  return PurchaseItem;
};