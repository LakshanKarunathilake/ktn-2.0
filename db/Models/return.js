'use strict';
module.exports = (sequelize, DataTypes) => {
  const Return = sequelize.define('Return', {
    name: DataTypes.STRING
  }, {});
  Return.associate = function(models) {
    // associations can be defined here
  };
  return Return;
};