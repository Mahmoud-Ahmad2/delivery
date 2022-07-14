'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      first_Name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      middle_Name: {
        type: Sequelize.STRING,
      },
      last_Name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_At: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_At: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  },
};
