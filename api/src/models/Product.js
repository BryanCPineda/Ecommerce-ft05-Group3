const { Sequelize, INTEGER } = require('sequelize');
const S = Sequelize;
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    id: {
      type: S.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Este campo no puede estar vacío'
        },
        len: {
          arrs: [[5, 40]],
          msg: 'El nombre debe tener entre 5 y 40 caracteres'
        }
      }
    },
    description: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Este campo no puede estar vacío'
        },
        len: {
          arrs: [[20, 255]],
          msg: 'La descripción debe tener entre 20 y 255 caracteres'
        }
      }
    },
    price: {
      type: S.DECIMAL(9, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Se requiere un precio',
        },
        isDecimal: {
          msg: 'El precio debe contener sus decimales (centavos), de ser un precio exacto puede incluir "00"'
        },
        min: {
          args: [0],
          msg: 'El precio no puede ser menor que 0,00'
        },
        max: {
          args: [999999999],
          msg: "El precio no puede contener más de 9 dígitos delante de la coma."
        }
      }
    },
    stock: {
      type: S.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Se requiere al menos un producto en stock',
        },
        isInt: {
          msg: 'El stock debe ser un número entero'
        },
        min: {
          args: [0],
          msg: 'El stock no puede ser menor a "0"'
        },
        max: {
          args: [999999999],
          msg: "El stock no puede contener más de 9 dígitos delante de la coma."
        }
      }
    },
    image: {
      type: S.STRING,
      allowNull: true,
    }
  });
};
