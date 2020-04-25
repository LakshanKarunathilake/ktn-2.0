const invoices = require('./data/Invoices');
let customers = require('./data/Customers');

module.exports = {
  up: (queryInterface, Sequelize) => {
    customers = customers.map(val => val.customer_code.toString());

    const newRecords = invoices.map(val => {
      let customerId;
      if (customers.includes(val.customer_code)) {
        customerId = parseInt(val.customer_code, 10);
      } else {
        customerId = 1;
      }
      console.log('c',customerId);
      return {
        invoice: val.invoice_id,
        total: val.total,
        grand: val.grandTotal,
        credit: val.Status,
        note: val.additional_note,
        customerId,
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
