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
      //    args: [3, 30],
          msg: 'El nombre debe tener entre 3 y 30 caracteres'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description is mandatory",
        },
        len: {
       //   args: [10, 80],
          msg: 'La descripcion debe tener entre 10 y 80 caracteres'
        }
      }
    }
  });
};
