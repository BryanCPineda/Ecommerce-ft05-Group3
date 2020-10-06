const server = require("express").Router();
const { Categories } = require("../db.js");

server.post("/products/category", (req, res, next) => {
  //falta completar atributos
  const { category } = req.body;
  Categories.findOrCreate()
    .then((category) => {
      console.log(category);
      res.status(201).json(category);
    })
    .catch(next)
    .catch(() => {
      return res.status(400).send("Category not created!");
    });
});

server.delete("products/category/:id", (req, res, next) => {
  const { id } = req.params;
  Categories.destroy({
    where: { id: id },
  })
    .then(() => {
      res.send("Category deleted");
    })
    .catch(next)
    .catch(() => {
      return res.status(400).send("Category not found!");
    });
});

module.exports = server;
