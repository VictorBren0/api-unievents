'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('category_maps', {
      id: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false, 
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categorys', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      map_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'maps', key: 'id' },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
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
    await queryInterface.dropTable('category_maps')
  },
}
