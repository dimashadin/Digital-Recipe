"use strict";

const { hashPass } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/user.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();

      el.password = hashPass(el.password);

      return el;
    });
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", null, {});
  },
};
