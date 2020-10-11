const server = require("express").Router();
const { Product, Image } = require("../db.js");


server.post('/', (req, res)=> {                   // This route add an image to a product
    const productId = req.body.productId;
    const image = req.body.image;

    Product.findByPk(productId)              
        .then((product)=>{                        //Getting the product   
                Image.findOrCreate({              //Saving the image in database
                    where:{
                        image: image
                    }
                }).then((image) =>{
                    product.addImage(image[0])    //Connecting the image to the product
                    res.status(200).send(image);
                })
        }).catch((err)=>{
                res.status(400).send(err);
        })
})


server.delete('/', (req, res) =>{                  // This route delete an product's image
    const imageId = req.body.imageId;
    Image.destroy({                                // Deleting the image by the received id
        where:{
            id: imageId
        }
    }).then(()=>{
        res.status(200).send("Image was deleted!")
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

server.get('/', (req, res)=>{                      // This transparent route brings all the images
    Image.findAll()
    .then((images) =>{
        res.status(200).send(images);
    })
    .catch((err)=>{
        res.status(500).send(err);
    })

})






module.exports = server;