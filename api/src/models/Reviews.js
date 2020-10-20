const { Sequelize } = require('sequelize');
const S = Sequelize;

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('reviews', {
        id: {
            type: S.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          description: {
            type: S.TEXT,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'Este campo no puede estar vacío'
              },
              len: {
                //args: [20, 255],
                msg: 'La descripción debe tener entre 20 y 255 caracteres'
              }
            }
          },
          qualification:{
              type: S.ENUM,
              defaultValue: "1",
              values: ["1","2","3","4","5"]
          }
      })
}
