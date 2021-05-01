'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    static associate(models) {
      accounts.belongsTo(models.accounts_types, {
        foreignKey: 'type'
      });
      accounts.hasMany(models.transactions, {
        foreignKey: 'account_ori'
      });
      accounts.belongsTo(models.clients, {
        foreignKey: 'client_id'
      })
    }
  };
  accounts.init({
    account_no: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    balance: DataTypes.INTEGER,
    type: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true,
    modelName: 'accounts',
  });
  return accounts;
};