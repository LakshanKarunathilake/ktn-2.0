module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: { type: DataTypes.STRING, unique: true },
      lastUpdated: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'OLD'
      }
    },
    {}
  );
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};
