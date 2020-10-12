const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    price: {
        type: DataTypes.DECIMAL(9, 2),
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
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: {
              args: [1],
              msg: 'La cantidad no puede ser menor que 1'
            },
            max: {
              args: [1000],
              msg: "La cantidad no puede ser mayor a 1000"
            }
          }
      },
      state: {
        type: DataTypes.INTEGER,
        defaultValue: 'Cart'
      }
    })
}