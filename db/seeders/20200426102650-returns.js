const returns = require('./data/Returns');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newRecords = returns
      .filter(val => val.qty > 0 && val.item_code !== '')
      .map(val => {
        return {
          itemCode: val.item_code,
          qty: val.qty,
          unit: val.qty > 0 ? val.amount / val.qty : val.amount,
          reason: val.Reason,
          createdAt: new Date(val.date),
          updatedAt: new Date(val.date),
          invoiceId: val.invoice_id
        };
      });
    return queryInterface.bulkInsert('Returns', newRecords, {});
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
