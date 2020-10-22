const server = require("express").Router();
const { Sequelize } = require("sequelize");
const { Product, Categories, Image } = require("../db.js");
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
    },
  })
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((err) => {
      return res.send({ data: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
    });
});
// Simply requesting for all products with findAll and catching possible errors.
server.get("/", (req, res) => {
  Product.findAndCountAll({
    // This function brings all the products and the it count'em.
    include: [
      {
        model: Image
        //se puede añadir un where para condicionar las busquedas
      },
      {
        model: Categories,
      },
    ],
  })
    .then((products) => {
      res.send(products);
    })
    .catch(() => {
      return res.send({ data: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
    });
});
// This function get all products that contains in the name or the description the string passed by.
server.get("/search", (req, res) => {
  const producto = req.query.valor;
  Product.findAndCountAll({
    // This function brings all the products and the it count'em.
    where: {
      [Op.or]: [
        // The operator function is passed to Sequelize above
        {
          name: {
            [Op.iLike]: "%" + producto + "%", // Syntax sugar to find the term passed by wherever its find in the text.
          },
        },
        {
          description: {
            [Op.iLike]: "%" + producto + "%", // Syntax sugar to find the term passed by wherever its find in the text.
          },
        },
      ],
	},
	include: [
		{
		  model: Image,
		  //se puede añadir un where para condicionar las busquedas
		},
		{
      model: Categories,
		},
	  ]
  })
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      return res.send({ data: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
    });
});

// This function allow us to bring an specific product indicating the id.
server.get("/:id", (req, res) => {
  const id = req.params.id;
  Product.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Image,
        //se puede añadir un where para condicionar las busquedas
      },
      {
        model: Categories,
      },
    ],
  })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      return res.send({ data: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
    });
});

//This function allow to modify a product receiving the Id by params and the rest of the information by body
server.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, description, price, stock } = req.body; // you can change only one property of the product or several of them
  Product.update(
    {
      name: name,
      description: description,
      price: price,
      stock: stock,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((confirmation) => {
      if (confirmation[0] === 0) {
        // checking if the id passed its correct
        return res.send({ data: "Product not found!" }).status(400); // Show proper error in DevTool to the FrontEnd guys.
      }
      return res.send("Product Updated");
    })
    .catch((err) => {
      return res.send({ data: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
    });
});

//This function allow to delete a product receiving the Id by params
server.delete("/:id", (req, res) => {
  const id = req.params.id;
  Product.destroy({
    where: {
      id: id,
    },
  })
    .then((confirmation) => {
      if (confirmation === 0) {            // checking if the id passed its correct
        return res.send({ data: "Product not found!" }).status(400); // Show proper error in DevTool to the FrontEnd guys.
      }
      return res.send("Product Deleted");
    })
    .catch((err) => {
      return res.send({ data: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
    });
});

server.post("/:idProducto/category/:idCategoria", (req, res, next) => {
  //add the category to the product
  const { idProducto, idCategoria } = req.params;
  Product.findByPk(idProducto).then((singleProduct) => {
    Categories.findByPk(idCategoria)
      .then((newcategory) => {
        console.log(newcategory);
        singleProduct.addCategory(newcategory);
      })
      .then((product) => {
        return res.json(product).status(201);
      })
      .catch((err) => {
        return res.send({ data: err }).status(400);
      });
  });
});

server.delete("/:idProducto/category/:idCategoria", (req, res, next) => {
  /* this one is for deleting the product category;) */
  const { idProducto, idCategoria } = req.params;

  Product.findByPk(idProducto).then((singleProduct) => {
    Categories.findByPk(idCategoria)
      .then((oldcategory) => {
        console.log(oldcategory);
        singleProduct.removeCategory(oldcategory);
      })
      .then(() => {
        return res.send("Category deleted").status(201);
      })
      .catch((err) => {
        return res.send({ data: err }).status(400);
      });
  });
});

// GET /products/categoria/:nombreCat
// Retorna todos los productos de {nombreCat} Categoría.
server.get('/category/:category', (req, res)=>{
	const category = req.params.category;
  Categories.findOne({
    where:{
      name: category
    }
  })
  .then(cat=>{
    let catId = cat.id;
    return Product.findAll({         // This function brings all the products from an specific category. 
      include: [
        {
          model: Image,
          //se puede añadir un where para condicionar las busquedas
        },
        {
          model: Categories,
          where:{
            id: catId
          }
        },
      ],
    })
  })
  .then(products=>{
    
    res.send(products)
  })
  .catch((err)=>{
    return res.send({data: err}).status(400); // Show proper error in DevTool to the FrontEnd guys.
  })
})

module.exports = server;
