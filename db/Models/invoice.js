'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    name: DataTypes.STRING
  }, {});
  Invoice.associate = function(models) {
    // associations can be defined here
  };
  return Invoice;
};