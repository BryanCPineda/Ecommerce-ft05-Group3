const server = require("express").Router();
const { Categories } = require("../db.js");

server.post("/", (req, res, next) => {
  //falta completar atributos
  const { name, description } = req.body;
  Categories.findOrCreate({
    where: {name:name, description:description}
  })
    .then((category) => {
      console.log(category);
      res.status(201).json(category);
    })
    .catch(() => {
      return res.status(400).send("Category not created!");
    });
});

server.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Categories.destroy({
    where: { id: id },
  }, /* {force:true} */) 
    .then((resultado) => {
      if(resultado){
       return res.send("Category deleted")
      }return res.status(400).send("Category not found!");
    })
});

server.put('/:id', (req, res, next) => {
  const {id} = req.params;
   const {name, description}= req.body /* <--- elemento del body que utilizaremos para el update */
  Categories.update(
     {name:name, description:description}, /* <----los atributos que queremos updatear */
    {where:{id:id}}
  ).then((valor)=>{
    const resultado=valor[0]
    if(resultado){
      return res.status(202).send('Element updated')
     }return res.status(400).send("Category not found!")   
  })
});

module.exports = server;
