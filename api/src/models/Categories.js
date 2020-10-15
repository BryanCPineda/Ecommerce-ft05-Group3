const { DataTypes } = require("sequelize");
// Exporting the function that define the orderline model, inside connect with sequelize

module.exports = (sequelize) => {
  sequelize.define("categories", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is mandatory",
        },
        len: {
          args: [3, 30],
          msg: "Name must have between 3 y 30 characters",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description is mandatory",
        },
        len: {
          args: [10, 80],
          msg: "Description must have between 10 y 80 characters",
        },
      },
    },
  });
};
