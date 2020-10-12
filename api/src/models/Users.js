const { Sequelize, BOOLEAN } = require('sequelize');
const S = Sequelize;

// Exporting the function that define the Users model, inside connect with sequelize
module.exports = (sequelize)=>{
  sequelize.define('user', {
    id: {
      type: S.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: S.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Name is mandatory'
        },
        len: [2, 20]
    },
    lastName: {
      type: S.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Lastname is mandatory'
        }},
        len: [2, 40]
      }
    },
    email: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'Email is mandatory'
        },
        isEmail: true,
        len:[5, 50]
      }
    },
    userType: {
      type: S.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
        },
        max: {
          args: [1],
        }
      }
    }
  })
}