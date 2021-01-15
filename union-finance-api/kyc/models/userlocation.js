'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserLocation.belongsTo( models.User , { foreignKey: 'user_id', as: 'user' } );
    }
  }
  UserLocation.init({
    address_1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address_2: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    country: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    zipcode: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.CHAR(20)
    }
  }, {
    sequelize,
    modelName: 'UserLocation',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return UserLocation;
};