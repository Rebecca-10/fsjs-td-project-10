'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
     as:"user",
     foreignKey:{
      fieldName:"userId",
      allowNull:false
     }

      })
    }
  }
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A Title is required",
          },
          notEmpty: {
            msg: "Please provide a Title",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A Description is required",
          },
          notEmpty: {
            msg: "Please provide a Description",
          },
        },
      },
      estimatedTime: DataTypes.STRING,
      materialsNeeded: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};