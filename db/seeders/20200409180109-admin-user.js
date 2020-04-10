module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'nimal',
          password:
            '7251feeb5601e5731cf73b5067d47f229648696c78500ded1aea8f5962ac031e2432359d2751b36cd6b9e13267dc8fba983c7303f39238fe7c0b2f0667af103d',
          salt: '4c03bc9047e118c038447e1f43928f20',
          type: '1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'lakshan',
          password:
            'abd8117b42a437b2b9aa7bbaca3b6d1707169303e71f67cafc603df4e4fecd82ef2ec2d5dfdab8c9b5b9ae25e37b5659b9a4614d45383dabbd7f8d9ad4e8dc6c',
          salt: '3aac271d6ec25060dbe3956ae84f2070',
          type: '1',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
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
