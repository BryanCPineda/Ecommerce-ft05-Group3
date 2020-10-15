const server = require("express").Router();
const { Categories } = require("../db.js");

server.get("/", (req, res, next) => {
  Categories.findAll()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

server.post("/", (req, res, next) => {
  /* this route is for creating new categories :B */

  const { name, description } = req.body;
  Categories.findOrCreate({
    where: { name: name, description: description },
  })
    .then((category) => {
      res.status(201).json(category[0]);
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

server.delete("/:id", (req, res, next) => {
  /* this one is for deleting existing rouTes ;) */
  const { id } = req.params;
  Categories.destroy(
    {
      where: { id: id },
    } /* {force:true} */
  ) /*  ===== IGNORE THIS /// FOR FUTURE REFERENCES-->this is an atribute we use if we want to do a hard delete instead of a soft one ====*/
    .then((result) => {
      if (result) {
        return res.send("Category deleted");
      }
      return res.status(400).send("Category not found!");
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

server.put("/:id", (req, res, next) => {
  /* and this other one is for modifying our existing routes :O */
  const { id } = req.params;
  const {
    name,
    description,
  } = req.body; /* <--- THE ELEMENT OF THE BODY WE ARE GOING TO USE FOR THE UPDATE */
  Categories.update(
    {
      name: name,
      description: description,
    } /* <----THE ATRIBUTES WE WANT TO UPDATE */,
    { where: { id: id } }
  )
    .then((value) => {
      const result = value[0];
      if (result) {
        return res.status(202).send("Element updated");
      }
      return res.status(400).send("Category not found!");
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

module.exports = server;
