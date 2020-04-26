const invoiceItems = require('./data/InvoiceItems');

/**
 * Delete non existing record from invoices
 *
 * item code : 3PK 0760
 * invoice : A2790
 * @type {{up: (function(*, *): <Object> | *), down: down}}
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    const newRecords = invoiceItems
      .filter(
        val => val.qty > 0 && val.returnable_qty >= 0 && val.item_code !== ''
      )
      .map(val => {
        return {
          code: val.Item_code,
          qty: val.qty,
          returnedQty: val.qty - val.returnable_qty,
          selling: val.total / val.qty,
          invoiceId: val.invoice_id,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      });
    return queryInterface.bulkInsert('InvoiceItems', newRecords, {});
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
