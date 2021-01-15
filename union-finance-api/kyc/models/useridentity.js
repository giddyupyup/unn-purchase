'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserIdentity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserIdentity.belongsTo( models.User, { foreignKey: 'user_id', as: 'user' } );
    }
  }
  UserIdentity.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middle_name: DataTypes.STRING,
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserIdentity',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return UserIdentity;
};