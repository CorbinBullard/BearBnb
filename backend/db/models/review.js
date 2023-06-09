'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Images
      Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId', onDelete: 'CASCADE' })
      //User
      Review.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      //Spots
      Review.belongsTo(models.Spot, { foreignKey: 'spotId', onDelete: 'CASCADE' })
    }
  }
  Review.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    spotId: {
      type: DataTypes.INTEGER,
      references: { model: 'Spot' },
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'User' },
      onDelete: 'CASCADE'
    },
    review: DataTypes.STRING(4000),
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
