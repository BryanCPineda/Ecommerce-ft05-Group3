const { Sequelize, BOOLEAN } = require("sequelize");
const S = Sequelize;

// Exporting the function that define the orderline model, inside connect with sequelize
module.exports = (sequelize) => {
  sequelize.define("orderline", {
    id: {
      type: S.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    price: {
      type: S.DECIMAL(9, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price is mandatory",
        },
        isDecimal: {
          msg:
            'Price must have decimals(cents), if it is an exact price could be "00"',
        },
        min: {
          args: [0],
          msg: "Price can't be less then 0,00",
        },
        max: {
          args: [999999999],
          msg: "Price can't have more then 9 digits.",
        },
      },
    },
    quantity: {
      type: S.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [1],
          msg: "Quantity can't be less then 1",
        },
        max: {
          args: [1000],
          msg: "Quantity can't be more then 1000",
        },
      },
    },
  });
};
