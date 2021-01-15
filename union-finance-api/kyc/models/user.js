'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define( 'User', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eth_address: DataTypes.STRING
  }, {
    modelName: 'User',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  } );

  User.associate = ( models ) => {
    // define association here
    User.hasOne( models.UserIdentity, { foreignKey: 'user_id' } );
    User.hasOne( models.UserLocation, { foreignKey: 'user_id' } );
    User.hasOne( models.UserDocument, { foreignKey: 'user_id' } );
    User.hasOne( models.UserFund, { foreignKey: 'user_id' } );
    User.hasMany( models.Synap, { foreignKey: 'user_id' } );
  }
  return User;
};