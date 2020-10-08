const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('image', {
            id: {
                type: DataTypes.INTEGER,
                allowNull:false,
                primaryKey: true,
                autoIncrement: true
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: false,
                    validate: {
                        notNull: {
                        msg: 'Este campo no puede estar vacío'
                        }
                    }
            }
    });
};
