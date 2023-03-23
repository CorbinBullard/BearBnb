'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Users";
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn(options, 'firstName', {
      type: Sequelize.STRING,
      allowNull: false

    });
    await queryInterface.addColumn(options, 'lastName', {
      type: Sequelize.STRING,
      allowNull: false

    })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(options, 'firstName')
    await queryInterface.removeColumn(options, 'lastName')
  }
};
