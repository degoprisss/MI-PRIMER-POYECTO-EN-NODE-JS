'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    static associate(models) {
      transactions.belongsTo(models.accounts, {
        foreignKey: 'account_ori'
      });
      transactions.belongsTo(models.transactions_types, {
        foreignKey: 'transaction_type'
      });
    }
  };
  transactions.init({
    account_ori: DataTypes.INTEGER,
    account_des: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    transaction_type: DataTypes.INTEGER,
    trans_data: DataTypes.DATE
  }, {
    sequelize,
    underscored: true,
    modelName: 'transactions',
  });
  return transactions;
};