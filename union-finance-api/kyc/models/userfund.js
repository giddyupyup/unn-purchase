'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFund extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserFund.belongsTo( models.User, { foreignKey: 'user_id', as: 'user' } );
    }
  }
  UserFund.init({
    contribution: {
      type: DataTypes.REAL,
      allowNull: false
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserFund',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return UserFund;
};