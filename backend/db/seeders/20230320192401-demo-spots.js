'use strict';
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Spots'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '100 Long Pond Ct',
        city: 'Greer',
        state: 'SC',
        country: 'US',
        lat: 10.00,
        lng: 12.00,
        name: 'House',
        description: 'Dumb house',
        price: 10.34
      },
      {
        ownerId: 2,
        address: '123 Meadow ln',
        city: 'Fort Worth',
        state: 'TX',
        country: 'US',
        lat: 130.00,
        lng: 112.00,
        name: 'Texas House',
        description: 'Big house',
        price: 106.34
      },
      {
        ownerId: 3,
        address: '113 BigBoi Dr',
        city: 'Somewhere',
        state: 'NC',
        country: 'US',
        lat: 222.00,
        lng: 152.00,
        name: 'BigBoi House',
        description: 'Some sort of house',
        price: 146.34
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['100 Long Pond Ct', '123 Meadow ln', '113 BigBoi Dr'] }
    }, {})
  }
};
