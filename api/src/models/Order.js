const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('order', {
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
    status: {
      type: DataTypes.ENUM({
          values: ['Cart', 'Created', 'Processing', 'Canceled', 'Complete']
        })
    }
    })
}
