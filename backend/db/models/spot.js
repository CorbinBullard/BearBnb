'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User
      Spot.belongsTo(models.User, { foreignKey: 'ownerId' })
      //Bookings
      Spot.belongsToMany(models.User, {
        through: 'Booking',
        foreignKey: 'spotId',
        otherKey: 'userId'
      })
      // Reviews
      Spot.belongsToMany(models.User, {
        through: 'Review',
        foreignKey: 'spotId',
        otherKey: 'userId'
      })
      //Spot Images
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId' })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      references: { model: 'User' }
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
