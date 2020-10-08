const server = require("express").Router();
const { Sequelize, where } = require("sequelize");
const { Product, Categories } = require("../db.js");
const Op = Sequelize.Op;

// Checking for a match in database and create the product.
// Of succeed, it create the product, return 201 status and product information, else return error and status 400!
server.post("/", (req, res, next) => {
  const { name, description, price, stock } = req.body;
  Product.findOrCreate({
    where: {
      name: name,
      description: description,
      price: price,
      stock: stock,
      image: "don't forget to make it",
    },
  })
    .then((product) => {
      res.status(201).send(product);
    })
    .catch(() => {
      return res.status(400).send("Product not created!");
    });
});
//Simply requesting for all products with findAll and catching possible errors.
server.get("/", (req, res) => {
  Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch(() => {
      return res.status(400).send("Couldn't find products!");
    });
});

// Crear ruta que retorne productos segun el keyword de búsqueda
// GET /search?query={valor}
// Retorna todos los productos que tengan {valor} en su nombre o descripción.
server.get("/search", (req, res) => {
  const producto = req.query.valor;
  Product.findAndCountAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${producto}%`,
          },
        },
        {
          description: {
            [Op.like]: `%${producto}%`,
          },
        },
      ],
    },
  })
    .then((product) => {
      res.send(product);
    })
    .catch(() => {
      return res.status(400).send("Couldn't find any products!");
    });
});

// GET /products/:id
// Retorna un objeto de tipo producto con todos sus datos. (Incluidas las categorías e imagenes).
server.get("/:id", (req, res) => {
  const id = req.params.id;
  Product.findOne({
    where: {
      id: id,
    },
    include: {
      model: Categories,
    },
  })
    .then((product) => {
      res.json(product);
    })
    .catch(() => {
      return res.status(400).send("Couldn't find the product!");
    });
});

server.post("/:idProducto/category/:idCategoria", (req, res, next) => {
  //add the category to the product

  const { idProducto, idCategoria } = req.params;
  const { description, name } = req.body;

  Categories.findOrCreate({
    where: { id: idCategoria, name: name, description: description },
    include: {
      model: Product,
      where: {
        id: idProducto,
      },
    },
  })
    .then((product) => {
      res.status(201).json(product);
    })
    .catch(() => {
      return res.status(400).send("Category not added!");
    });
});

server.delete("/:idProducto/category/:idCategoria", (req, res, next) => {
  /* this one is for deleting the product category;) */
  const { idProducto, idCategoria } = req.params;
  Product.destroy({
    where: {
      id: idCategoria,
      include: {
        model: Categories,
        where: {
          id: idProducto,
        },
      },
    },
  })
    .then((result) => {
      if (result) {
        return res.send("Category deleted");
      }
      return res.status(400).send("Category not found!");
    })
    .catch((err) => {
      return res.status(400).send(err);
    }); //.catch((err) => next({status:404, message:'Not found'}))  *******  <-----ignore this, its for future references *******
});

module.exports = server;
