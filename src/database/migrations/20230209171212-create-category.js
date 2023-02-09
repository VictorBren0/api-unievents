'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categorys', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false, 
      },
      name: {
        type: Sequelize.STRING(),
        allowNull: false,
      },
      event: {
        type: Sequelize.STRING(),
        allowNull: false,
      },
      locale: {
        type: Sequelize.STRING(),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categorys')
  },
}