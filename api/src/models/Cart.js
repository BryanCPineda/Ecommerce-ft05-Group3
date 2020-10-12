const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    }
})
}