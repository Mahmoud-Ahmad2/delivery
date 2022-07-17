'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      deliverer_Id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      order: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'IN_PROGRESS',
      },
      deleted_At: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_By: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      updated_By: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      delivered_At: {
        allowNull: true,
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('Orders');
  },
};
