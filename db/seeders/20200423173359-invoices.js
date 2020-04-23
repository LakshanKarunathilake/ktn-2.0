const invoices = require('./data/Invoices');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newRecords = invoices.map(val => {
      return {
        invoice: val.invoice_id,
        total: val.total,
        grand: val.grandTotal,
        credit: val.Status,
        note: val.additional_note,
        createdAt: new Date(val.orderDate),
        updatedAt: new Date(val.orderDate)
      };
    });
    return queryInterface.bulkInsert('Invoices', newRecords, {});
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
