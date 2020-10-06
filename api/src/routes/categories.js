const server = require("express").Router();
const { Categories } = require("../db.js");

server.post("/products/category", (req, res, next) => {
  category = req.body;
  Categories.create()
    .then((category) => {
      res.json(category);
    })
    .catch(error);
});

server.delete("products/category/:id", (req, res, next) => {
  const { id } = req.params;
  Categories.destroy({
    where: { id: id },
  })
    .then(() => {
      res.send("Categoria eliminada");
    })
    .catch(error);
});

/*server.put('/products/:idProducto/category/:idCategoria', (req, res, next) => {
    const categoria =
       
    Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});*/

module.exports = server;
