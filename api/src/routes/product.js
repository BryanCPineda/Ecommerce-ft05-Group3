const server = require('express').Router();
const { Product } = require('../db.js');
// POST /products
// Controla que estén todos los campos requeridos, si no retorna un statos 400.
// Si pudo crear el producto retorna el status 201 y retorna la información del producto.
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
		console.log('PROMISE', product);
			res.status(201).send(product);
		})
	.catch(()=>{
		return res.status(400).send('Product not created!');
	})
});

module.exports = server;
