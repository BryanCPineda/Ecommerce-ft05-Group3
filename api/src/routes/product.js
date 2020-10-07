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
//Simply requesting for all products with findAll and catching possible errors.
server.get('/', (req, res)=>{
	Product.findAll()
		.then(products=>{
			res.send(products)
		})
		.catch((err)=>{
			return res.status(400).send(err);
		})
})

// Crear ruta que retorne productos segun el keyword de búsqueda
// GET /search?query={valor}
// Retorna todos los productos que tengan {valor} en su nombre o descripción.
server.get('/search', (req, res)=>{
	const producto = req.query.valor;
	Product.findAndCountAll({
		where: {
			[Op.or]:[
				{
					name: { 
						[Op.like]: `%${producto}%` 
					}
				}, 
				{
					description: { 
						[Op.like]: `%${producto}%` 
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

// GET /products/:id
// Retorna un objeto de tipo producto con todos sus datos. (Incluidas las categorías e imagenes).
server.get('/:id', (req, res)=>{
	const id = req.params.id;
	Product.findOne({
		where: {
			id: id,
		},
		include: {
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
	Product.update( 
		{	
			name: name,
			description: description,
			price: price,
			stock: stock 
		},
		{	
			where: {
				id:id
			}
		},
	)
		.then(product=>{
			res.json(product) 
		})
		.catch((err)=>{
			return res.status(400).send(err);
		})
})

module.exports = server;
