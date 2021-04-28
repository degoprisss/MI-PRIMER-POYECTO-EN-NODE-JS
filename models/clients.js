'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clients extends Model {
    static associate(models) {
      this.belongsTo(models.accounts, {
        foreignKey: 'client_id'
      })
    }
  };
  clients.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true,
    modelName: 'clients',
  });
  return clients;
};