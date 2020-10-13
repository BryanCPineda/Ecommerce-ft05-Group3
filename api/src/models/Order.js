const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
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
      }
    })
}
