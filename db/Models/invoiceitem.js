'use strict';
module.exports = (sequelize, DataTypes) => {
  const InvoiceItem = sequelize.define('InvoiceItem', {
    name: DataTypes.STRING
  }, {});
  InvoiceItem.associate = function(models) {
    // associations can be defined here
  };
  return InvoiceItem;
};