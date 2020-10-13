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
        len: {
          args: [2, 30],
          msg: 'Name field must to be at least 2 characters long.'
        },
        isAlpha: true
    },
    lastName: {
      type: S.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Lastname is mandatory.'
        }},
      len: {
        args: [2, 50],
        msg: 'Lastname field must to be at least 2 characters long.'
      },
      isAlpha: true
    }
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email is mandatory.'
        },
        isEmail: {
          args: true,
          msg: 'This email format is invalid.'
        },
        len:[5, 50]
      }
    },
    password: {
      type: S.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Password is mandatory.'
        }, 
        len:{
          args: [8, 50],
          msg: 'Password must have at least 8 characters.'
        }
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
    },
    adress:{
      type: S.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'Postal adress is mandatory.'
        },
        len: {
          args: [5, 60],
          msg: 'Adress field must to be at least 2 characters long.'
        }
      }
    },
    image: {
      type: S.TEXT,
      allowNull: true,
    }
  })
}