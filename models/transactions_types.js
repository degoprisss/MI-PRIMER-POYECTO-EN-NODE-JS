'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions_types extends Model {
    static associate(models) {
      transactions_types.hasMany(models.transactions, {
        foreignKey: 'transaction_type'
      })
    }
  };
  transactions_types.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    modelName: 'transactions_types',
  });
  return transactions_types;
};