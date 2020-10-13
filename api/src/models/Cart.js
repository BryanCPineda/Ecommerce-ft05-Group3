const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
      state: {
        type: DataTypes.ENUM({
            values: ['Cart', 'Creada', 'Procesando', 'Cancelada', 'Completa']
          })
      }
})
}
