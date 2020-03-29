'use strict';
module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define('Purchase', {
    name: DataTypes.STRING
  }, {});
  Purchase.associate = function(models) {
    // associations can be defined here
  };
  return Purchase;
};