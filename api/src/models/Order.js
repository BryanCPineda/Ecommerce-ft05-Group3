const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
      validate: {     
        isDecimal: true,
        min: {
          args: [0]       
        },
        max: {
          args: [999999999]           
        }
      }
    },
    state: {
      type: DataTypes.ENUM({
          values: ['Cart', 'Creada', 'Procesando', 'Cancelada', 'Completa']
        })
    }
    })
}
