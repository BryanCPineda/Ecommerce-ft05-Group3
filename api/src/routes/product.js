const server = require("express").Router();
const { Sequelize, where } = require("sequelize");
const { Product, Categories, Image } = require("../db.js");
const Op = Sequelize.Op;

// Checking for a match in database and create the product.
// Of succeed, it create the product, return 201 status and product information, else return error and status 400!

server.post('/', (req, res, next) => {
	const {name, description, price, stock} = req.body;
	Product.findOrCreate({
		where:{
				name: name,
				description: description,
				price: price,
				stock: stock,
		}
	})
	.then(product => {
		res.status(201).send(product);
	})
	.catch((err)=>{
		return res.status(400).send({message: err});
	})
});
// Simply requesting for all products with findAll and catching possible errors.
server.get('/', (req, res)=>{

	Product.findAndCountAll({
		include:[
				{
					model: Image
					//se puede añadir un where para condicionar las busquedas
				},
				{
					model: Categories
				}
		]
	})
		.then(products=>{
			res.send(products)
		})
		.catch(()=>{
			return res.status(400).send({message: err});
		})
})
// This function get all products that contains in the name or the description the string passed by.
server.post('/search', (req, res)=>{
	const producto = req.query.valor;
	console.log(producto)
	Product.findAndCountAll({ // This function brings all the products and the it count'em.
		where: {
			[Op.or]:[			      // The operator function is passed to Sequelize above
				{
					name: { 
						[Op.like]: `%${producto}%`   // Syntax sugar to find the term passed by wherever its find in the text.
					}
				}, 
				{
					description: { 
						[Op.like]: `%${producto}%` 	// Syntax sugar to find the term passed by wherever its find in the text.
					}
				}
			]
		}
	})
	.then((product)=>{
		res.send(product)
	})
	.catch((err)=>{
		return res.status(400).send({message: err});
	})
})

// This function allow us to bring an specific product indicating the id.
server.get('/:id', (req, res)=>{
	const id = req.params.id;
	Product.findOne({
		where: {
			id: id
		},
		include:[
			{
				model: Image
				//se puede añadir un where para condicionar las busquedas
			},
			{
				model: Categories
			}
	]
	})
		.then(product=>{
			res.json(product)
		})
		.catch((err)=>{
			return res.status(400).send({message: err}); //Catching error from model.
		})
})

//This function allow to modify a product receiving the Id by params and the rest of the information by body
server.put('/:id', (req, res)=>{
	const id = req.params.id;
	const { name, description, price, stock } = req.body; // you can change only one property of the product or several of them
	Product.update({	
			name: name,
			description: description,
			price: price,
			stock: stock 
		},
		{	
			where: {
				id:id
			}
	})
	.then((confirmation)=>{
		if(confirmation[0] === 0){   // checking if the id passed its correct
			return res.send('Product not found!')
		}
		return res.send('Product Updated')
	})
	.catch((err)=>{
		return res.status(400).send({message: err});
	})
})

//This function allow to delete a product receiving the Id by params
server.delete('/:id', (req, res)=>{
	const id = req.params.id;
	Product.destroy({	
		where: {
			id:id
		}
	})
		.then((confirmation)=>{
			if(confirmation === 0){   // checking if the id passed its correct
				return res.send('Product not found!')
			}
			return res.send('Product Deleted')
		})
		.catch((err)=>{
			return res.status(400).send({message: err});
		})
})

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
    .catch((err) => {
      return res.status(400).send({message: err});
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
      return res.status(400).send({message: err});
    }); //.catch((err) => next({status:404, message:'Not found'}))  *******  <-----ignore this, its for future references *******
});

module.exports = server;