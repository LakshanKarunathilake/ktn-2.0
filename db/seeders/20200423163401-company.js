const companies = require('./data/Companies');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newRecords = companies.map(val => {
      return {
        name: val.name,
        address: val.address,
        contactNumber: val.telephone,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });
    console.log('new', newRecords);
    return queryInterface.bulkInsert('Companies', newRecords, {});
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
