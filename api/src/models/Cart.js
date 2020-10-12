const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    }
})
}
