const server = require('express').Router();
const { Product } = require('../db.js');

server.post("/", (req, res) => {
    Product.create({
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock,
        price: req.body.price,

    })
        .then(() => {
            res.status(201).send("producto creado con exito");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("hubo un error");
        });
});

module.exports = server;
