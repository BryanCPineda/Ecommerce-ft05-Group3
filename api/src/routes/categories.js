const server = require("express").Router();
const { Categories } = require("../db.js");

server.post("/products/category", (req, res, next) => {
  //falta completar atributos
/*acá debería hacerse destructuring o añadir el nombre de la variable detrás del req.body.etc
         seria algo asi como: 
let category = req.body.category; 
	o de lo contrario 
let {category} = req.body*/
  category = req.body;
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
//eliminar siempre código desechado comentado o especificar si se necesitará!

/*server.put('/products/:idProducto/category/:idCategoria', (req, res, next) => {
    const categoria =
       
    Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});*/

module.exports = server;
