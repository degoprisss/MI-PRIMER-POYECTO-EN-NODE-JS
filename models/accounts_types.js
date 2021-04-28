'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts_types extends Model {
    static associate(models) {
      accounts_types.hasMany(models.accounts, {
        foreignKey: 'account_no'
      })
    }
  };
  accounts_types.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    modelName: 'accounts_types',
  });
  return accounts_types;
};