'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserDocument.belongsTo( models.User, { foreignKey: 'user_id', as: 'user' } );
    }
  }
  UserDocument.init({
    session_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    synaps_status: {
      type: DataTypes.STRING
    },
    user_timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    finish_verification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'UserDocument',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return UserDocument;
};