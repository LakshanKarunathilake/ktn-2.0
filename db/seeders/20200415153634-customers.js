const customers = require('./data/Customers');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newRecords = customers.map(val => {
      let tel = val.Telephone;
      const regex = /[\+]?\d{10}/;
      let address = (val.Address1 + val.Address2 + val.State)
        .replace('-', '')
        .replace('(', '')
        .replace(',', '')
        .replace('/', '')
        .replace(')', '');
      const tels = address.match(regex);
      if (tels) {
        tels.forEach(v => {
          tel = `${tel} ${v}`;
        });
      }
      tel = tel
        .replace('-', '')
        .replace('(', '')
        .replace(')', '')
        .replace(',', '')
        .replace('/', '');
      address = address.split(regex);
      let finalAdress = '';
      address.forEach(v => {
        if (v) {
          finalAdress = `${finalAdress} ${v}`;
        }
      });

      return {
        id: val.customer_code,
        name: val.name,
        contactNumber: tel,
        address: finalAdress,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });
    return queryInterface.bulkInsert('Customers', newRecords, {});
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
