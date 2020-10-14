const server = require("express").Router();
const { Product, Categories, Image, Users,  } = require("../db.js");
const { Sequelize } = require('sequelize')

server.post('/', (req, res)=>{
  const { name, lastName, email, password, userType, image, adress } = req.body;
  console.log('REQUEST', req.body)
  Users.findOne({
    where:{
      email: email
    }
  })
  .then(user=>{
    if(!user){
      return Users.create({
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        userType: userType,
        adress: adress,
        image: image
      })
    }
    return res.send('This user already exists, choose a diferent one!').status(100);
  })
  .then(user=>{
    console.log('USERCREATED', user)
    return res.send(user)
  })
  .catch(() => {
    // res.send({ data: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
  });
})

module.exports = server;