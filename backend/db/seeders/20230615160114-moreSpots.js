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
        ownerId: 3,
        address: 'Birmingham',
        city: 'England',
        state: 'England',
        country: 'England',
        lat: 10.00,
        lng: 12.00,
        name: 'House',
        description: 'Come and enjoy your stay at this quaint, lovely home in the heart of our beloved Birmingham! Bursting with character and charm, we put all of our love and care into this home and added plenty of fun amenities for you and your loved ones to enjoy, including: fun indoor games, a jacuzzi, and secret gardens. There are two areas one can park. There are a few on one side of the house for unloading your vehicle, and plenty in the back for long term parking. We also supply wifi and will grant you access upon your arrival. We look forward to meeting you!',
        price: 200
      },
      {
        ownerId: 2,
        address: '143 Lake Street',
        city: 'Lake Lure',
        state: 'SC',
        country: 'US',
        lat: 130.00,
        lng: 112.00,
        name: 'Lakefront Pinnacle',
        description: 'Affectionately known as Parabulls Point, this 5BR/5.5BA estate wows with incredible lake views and luxe amenities. Made up of a main house and guest cottage, this retreat boasts a private boat dock, provided SUPs and kayaks, a lakefront deck with a pergola, and a 75 stainless steel water slide -- your own personal water park!',
        price: 2620
      },
      {
        ownerId: 3,
        address: '112 Snow Street',
        city: 'Fairplay',
        state: 'CO',
        country: 'US',
        lat: 222.00,
        lng: 152.00,
        name: 'Pikes Peak Views',
        description: `Private mountain getaway with huge views on 10 wooded acres! The property is nestled among mature timber, with a creek running through the backyard. Most days, you'll get to see moose :) The main house is 3700+ sq ft with 3 bedrooms, a loft, and 3.5 bathrooms; the detached garage is heated with 2 separate bunk-rooms. FAST Wifi (Starlink), hot tub, covered deck & patio, pool table, sunrise over Pike's Peak, and views of the Milky Way at night :)`,
        price: 705
      },
      {
        ownerId: 3,
        address: '116 Castle Boulevard',
        city: 'New York',
        state: 'NY',
        country: 'US',
        lat: 222.00,
        lng: 152.00,
        name: 'Highlands Castle',
        description: `Highlands Castle is a hidden jewel in a private setting, yet only 3-minutes from downtown Bolton Landing with the conveniences of a supermarket, gourmet restaurants, wine store, brewery, unique shops, 2-public parks with picnic areas, 2-public beaches, swimming, fishing, kayaking, tennis, golf, miniature golf, hiking trails, bicycling, boat rentals, scenic boat cruises, and more!`,
        price: 13631
      },
      {
        ownerId: 3,
        address: '116 Boat Lane',
        city: 'Springfield',
        state: 'TN',
        country: 'US',
        lat: 222.00,
        lng: 152.00,
        name: 'Big Boat',
        description: `Welcome to Kelly’s Jubilee. Look us up online for a discount and more information on our romantic and birthday packages. The ark was featured in Southern Living magazine and Tennessee Crossroads. (A travel show)
Airbnb is having technical problems and no longer offers any kind of support for its hosts. I’m sorry if the calendar says not updated. Please try the website or contact me the number is listed on the Kelly’s Jubilee website.`,
        price: 1170
      },
      {
        ownerId: 3,
        address: '117 Cabin Way',
        city: 'Sevierville',
        state: 'TN',
        country: 'US',
        lat: 222.00,
        lng: 152.00,
        name: 'Big Boat',
        description: `All guests will have the chance to see the city of Gatlinburg on the south view of the property with stunning night lights and views of the smoky mountains. To enjoy the sights, there is an oversized deck that wraps around the back of the cabin where you are able to lounge in our included hot tub to watch the sunrises and sunsets with a magnificent direct view of Mount Le Conte; a perfect place for romantic pictures and family memories.`,
        price: 2388
      },
      {
        ownerId: 3,
        address: '118 Beach Road',
        city: 'Folly Beach',
        state: 'SC',
        country: 'US',
        lat: 222.00,
        lng: 152.00,
        name: 'Washout Oceanfront',
        description: `This property is in a quiet residential community, and Folly Beach has a strict noise ordinance violation rule of 1 strike. Respect neighbors, keep the noise down and, NO parties. This beautiful 4 bedroom/3 bath home accommodates up to 9 guests. Situated just steps from the beach, the porches offer the perfect vantage point for soaking up the breathtaking sights and sounds of the coast or sipping on your favorite beverage as you watch the waves roll in.`,
        price: 6925
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
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
