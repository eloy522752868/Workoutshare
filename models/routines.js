//creating user model user table egon fixed issue 04/28/2021
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Routines extends Model {}

Routines.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weekdays: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "routine",
  }
);

module.exports = Routines;
