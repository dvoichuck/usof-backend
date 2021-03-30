'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "default-user-image.png"
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      email_confirm: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password_reset: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM("user", "admin"),
        defaultValue: "user"
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};