module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'Company',
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      address: { type: DataTypes.STRING, allowNull: false },
      contactNumber: { type: DataTypes.STRING, allowNull: false },
      lastUpdated: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'OLD'
      }
    },
    {}
  );
  Company.associate = function(models) {
    // associations can be defined here
  };
  return Company;
};
