const server = require("express").Router();
const { Product, Categories, Image, Users,  } = require("../db.js");

server.post('/', (res, req)=>{
  console.log('REQUEST', req.body)
  const { name, lastName, email, image, adress} = req.body;
  Users.findOrCreate({
    where: {
      name: name,
      lastName: lastName,
      email: email,
      adress: adress,
      image: image
    }
  })
  .then(user=>{
    res.send(user)
  })
  .catch((err) => {
    return res.send({ data: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
  });
})