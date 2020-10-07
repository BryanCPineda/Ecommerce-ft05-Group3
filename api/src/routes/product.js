const server = require('express').Router();
const { Sequelize } = require('sequelize');
const { Product, Categories } = require('../db.js');
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
				image: 'don\'t forget to make it'
		}
	})
	.then(product => {
		res.status(201).send(product);
	})
	.catch((err)=>{
		return res.status(400).send(err);
	})
});
// Simply requesting for all products with findAll and catching possible errors.
server.get('/', (req, res)=>{
	Product.findAll()
		.then(products=>{
			res.send(products)
		})
		.catch((err)=>{
			return res.status(400).send(err);
		})
})

// This function get all products that contains in the name or the description the string passed by.
server.get('/search', (req, res)=>{
	const producto = req.query.valor;
	Product.findAndCountAll({
		where: {
			[Op.or]:[			// The operator function is passed to Sequelize above
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
		return res.status(400).send(err);
	})
})

// This function allow us to bring an specific product indicating the id.
server.get('/:id', (req, res)=>{
	const id = req.params.id;
	Product.findOne({
		where: {
			id: id
		},
		include: { // Also bring the categories to which it belongs
			model: Categories
		}
	})
		.then(product=>{
			res.json(product)
		})
		.catch((err)=>{
			return res.status(400).send(err); //Catching error from model.
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
		if(confirmation === 0){   // checking if the id passed its correct
			return res.send('Product not found!')
		}
		return res.send('Product Updated')
	})
	.catch((err)=>{
		return res.status(400).send(err);
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
		.catch((error)=>{
			return res.status(400).send(error);
		})
})

module.exports = server;