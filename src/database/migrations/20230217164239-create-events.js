'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false, 
      },
      title: {
        type: Sequelize.STRING(),
        allowNull: false,
      },
      date: {
        type: Sequelize.STRING(),
        allowNull: false,
      },
      time: {
        type: Sequelize.STRING(),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(),
        allowNull: false,
      },
      posy: {
        type: Sequelize.DOUBLE(),
        allowNull: true,
      },
      posx: {
        type: Sequelize.DOUBLE(),
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
    await queryInterface.dropTable('events')
  },
}