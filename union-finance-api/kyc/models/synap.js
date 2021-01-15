'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Synap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Synap.belongsTo( models.User, { foreignKey: 'user_id', as: 'user' } );
    }
  }
  Synap.init({
    session_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    step: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.CHAR(15),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Synap',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Synap;
};