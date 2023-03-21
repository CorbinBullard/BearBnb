'use strict';
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const { Op } = require('sequelize');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */



module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'Users'
   await queryInterface.bulkInsert(options, [
    {
      email: 'demo@user.io',
      username: 'DemoUser',
      hashedPassword: bcrypt.hashSync('password'),
      firstname: 'User',
      lastName: 'One'
    },
     {
       email: 'user1@user.io',
       username: 'FakeUser1',
       hashedPassword: bcrypt.hashSync('password1'),
       firstname: 'User',
       lastName: 'Two'
     },
     {
       email: 'user2@user.io',
       username: 'FakeUser2',
       hashedPassword: bcrypt.hashSync('password2'),
       firstname: 'User',
       lastName: 'Three'
     },
     {
       email: 'user3@user.io',
       username: 'FakeUser3',
       hashedPassword: bcrypt.hashSync('password3'),
       firstname: 'User',
       lastName: 'Four'
     }
   ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['DemoUser', 'FakeUser1', 'FakeUser2', 'FakeUser3'] }
    }, {});
  }
};
