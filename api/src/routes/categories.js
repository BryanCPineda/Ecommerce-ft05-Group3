const server = require("express").Router();
const { Categories } = require("../db.js");

server.post("/", (req, res, next) => {
  //falta completar atributos
  const { category } = req.body;
  Categories.findOrCreate()
    .then((category) => {
      console.log(category);
      res.status(201).json(category);
    })
    .catch(() => {
      return res.status(400).send("Category not created!");
    });
});

server.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Categories.destroy({
    where: { id: id },
  })
    .then(() => {
      res.send("Category deleted");
    })
    .catch(() => {
      return res.status(400).send("Category not found!");
    });
});

server.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    description,
  } = req.body; /* <--- elemento del body que utilizaremos para el update */
  Categories.update(
    {
      name: name,
      description: description,
    } /* <----los atributos que queremos updatear */,
    { where: { id: id } }
  )
    .then(() => {
      res.status(202).send("Element updated");
    })
    .catch(() => {
      return res.status(400).send("Category not found!");
    });
});

module.exports = server;
