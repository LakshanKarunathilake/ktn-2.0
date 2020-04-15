const categories = require('./data/Categories');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const newRecords = categories.map(val => {
      return {
        name: val.name,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });
    return queryInterface.bulkInsert('Categories', newRecords, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
