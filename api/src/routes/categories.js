const server = require("express").Router();
const { Categories } = require("../db.js");


server.post("/", (req, res, next) => { /* this route is for creating new categories :B */
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

server.delete("/:id", (req, res, next) => {  /* this one is for deleting existing rouTes ;) */
  const { id } = req.params;
  Categories.destroy({
    where: { id: id },
  }, /* {force:true} */) 
    .then((result) => {
      if(result){
       return res.send("Category deleted")
      }return res.status(400).send("Category not found!");
    }).catch(next)
    //.catch((err) => next({status:404, message:'Not found'}))  *******  <-----ignore this, its for future references *******
});

server.put('/:id', (req, res, next) => { /* and this other one is for modifying our existing routes :O */
  const {id} = req.params;
   const {name, description}= req.body /* <--- THE ELEMENT OF THE BODY WE ARE GOING TO USE FOR THE UPDATE */
  Categories.update(
     {name:name, description:description}, /* <----THE ATRIBUTES WE WANT TO UPDATE */
    {where:{id:id}}
  ).then((value)=>{
    const result=value[0]
    if(result){
      return res.status(202).send('Element updated')
     }return res.status(400).send("Category not found!")   
  })
    .catch(() => {
     return res.status(400).send("Category not found!");
    });
});

module.exports = server;
