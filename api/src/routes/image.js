const server = require("express").Router();
const { Product, Image } = require("../db.js");


server.post('/', (req, res)=> {
    const productId = req.body.productId;
    const image = req.body.image;

    Product.findByPk(productId)
        .then((product)=>{
                Image.findOrCreate({
                    where:{
                        image: image
                    }
                }).then((image) =>{
                    product.addImage(image[0])
                    res.status(200).send(image);
                })
        }).catch((err)=>{
                res.status(400).send(err);
        })
})


server.delete('/', (req, res) =>{
    const imageId = req.body.imageId;
    Image.destroy({
        where:{
            id: imageId
        }
    }).then(()=>{
        res.status(200).send("Image was deleted!")
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

server.get('/', (req, res)=>{
    Image.findAll()
    .then((images) =>{
        res.status(200).send(images);
    })
    .catch((err)=>{
        res.status(500).send(err);
    })

})






module.exports = server;