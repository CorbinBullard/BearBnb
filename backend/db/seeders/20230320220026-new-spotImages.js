'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'SpotImages'
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
        spotId: 1,
        url: `https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg`,
        preview: true
      },
      {
        spotId: 2,
        url: `https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg`,
        preview: true
      },
      {
        spotId: 3,
        url: `https://images.adsttc.com/media/images/63c0/a935/7643/4a39/8498/948f/large_jpg/casa-tunich-apiron_13.jpg?1673570670`,
        preview: true
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
    await queryInterface.bulkDelete(options, null, {})
  }
};
