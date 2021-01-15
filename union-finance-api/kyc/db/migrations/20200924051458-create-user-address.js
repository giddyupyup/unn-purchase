'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
            key: 'id'
          },
          allowNull: false
        },
        allowNull: false
      },
      address_1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_2: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.CHAR(50),
        allowNull: false
      },
      country: {
        type: Sequelize.CHAR(50),
        allowNull: false
      },
      zipcode: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.CHAR(20)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserLocations');
  }
};