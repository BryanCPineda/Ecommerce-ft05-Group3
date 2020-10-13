const { Sequelize } = require('sequelize');
const S = Sequelize;

// Exporting the function that define the Users model, inside connect with sequelize
module.exports = (sequelize)=>{
  sequelize.define('users', {
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
        len: [2, 20],
        isAlpha: true
    },
    lastName: {
      type: S.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Lastname is mandatory'
        }},
      len: [2, 40],
      isAlpha: true
    }
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email is mandatory'
        },
        isEmail: {
          args: true,
          msg: 'This email format is invalid.'
        },
        len:[5, 50]
      }
    },
    userType: {
      type: S.ENUM,
      allowNull: false,
      defaultValue: 'client',
      values: ['client', 'admin'],
      validate: {
        notNull: {
          msg: 'The type of user must be defined'
        }
      }
    }
  })
}