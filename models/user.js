'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    email_confirm: DataTypes.STRING,
    password_reset: DataTypes.STRING,
    role: DataTypes.ENUM("user", "admin")
  }, {
    sequelize,
    modelName: 'user',
    timestamps: false
  });
  return user;
};