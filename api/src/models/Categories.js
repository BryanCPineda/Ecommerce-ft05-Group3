const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Este campo no puede estar vacío'
        },
        len: {
          arrs: [[3, 30]],
          msg: 'El nombre debe tener entre 3 y 30 caracteres'
        }
      }
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Este campo no puede estar vacío'
        },
        len: {
          arrs: [[10, 80]],
          msg: 'La descripcion debe tener entre 10 y 80 caracteres'
        }
      }
    }
  });
};
