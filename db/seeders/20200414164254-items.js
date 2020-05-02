const items = require('./data/Items');
let categories = require('./data/Categories');

module.exports = {
  up: (queryInterface, Sequelize) => {
    categories = categories
      .filter(val => val.Item_code !== '')
      .map(val => val.name);
    const newRecords = items.map(val => {
      let category = 'UNKNOWN';
      if (categories.includes(val.category)) {
        category = val.category;
        // console.log('category', val.category);
      }
      let unit;
      switch (val.Unit) {
        case 'Feet':
          unit = 'Feet';
          break;
        case 'Meter':
          unit = 'Meter';
          break;
        case 'NO':
          unit = 'Pcs';
          break;
        default:
          unit = 'Pcs';
      }
      const record = {
        code: val.Item_code,
        category,
        vehicle: val.Vehicle,
        brand: val.brand,
        description: val.description,
        stock: val.stock,
        selling: val.selling,
        cost: val.cost,
        unit,
        location: val.location,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      return record;
    });
    return queryInterface.bulkInsert('Items', newRecords, {});
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
