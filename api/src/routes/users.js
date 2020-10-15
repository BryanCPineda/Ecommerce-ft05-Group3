const server = require("express").Router();
const { Product, Categories, Image, Users } = require("../db.js");
const { Sequelize } = require("sequelize");

server.get("/", (req, res, next) => {
  Users.findAndCountAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

server.post("/", (req, res) => {
  const { name, lastName, email, password, userType, image, adress } = req.body;
  console.log("REQUEST", req.body);
  Users.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) {
        return Users.create({
          name: name,
          lastName: lastName,
          email: email,
          password: password,
          userType: userType,
          adress: adress,
          image: image,
        });
      }
      return res
        .send("This user already exists, choose a diferent one!")
        .status(100);
    })
    .then((user) => {
      return res.send(user);
    })
    .catch((err) => {
      res.send({ data: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
    });
});

server.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    lastName,
    email,
    password,
    adress,
    image,
  } = req.body; /* <--- THE ELEMENT OF THE BODY WE ARE GOING TO USE FOR THE UPDATE */
  Users.update(
    {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
      adress: adress,
      image: image,
    } /* <----THE ATRIBUTES WE WANT TO UPDATE */,
    { where: { id: id } }
  )
    .then((value) => {
      console.log("el value", value);
      const result = value[0];
      if (result) {
        return res.status(202).send("Element updated");
      }
      return res.status(400).send("User not found!");
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

module.exports = server;
