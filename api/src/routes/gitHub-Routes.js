const server = require("express").Router();
const passport = require('passport');


//cuando se hace un GET a /github se hace un redireccionamiento a la pagina de gitHub la cual pide los permisos al user
//automaticamente aceptados los permisos, la pagina de gitHub va a redireccionar a /github/callback
server.get('/', passport.authenticate('github', { scope: ['profile', 'email'] })); 
                                                                                 
//cuando se hace un GET a /github/callback aqui trae todos los datos del perfile del usuario y los guarda en req.user
server.get('/callback', passport.authenticate('github'), (req, res) => {
    // Successful authentication, redirect home.
    //res.send(req.user);
                          //console.log(req.user)        //se puede consologear el req.user para saber que retorno GitHub en su autenticacion
    res.redirect('http://localhost:3000/user/catalogo'); //si no le decimos a esta direccion que nos redirija a otra pagina, 
  }                                          //nos vamos a quedar en  http://localhost:4000/github/callback, y el usuario tendria que tipear
);                                           //nuevamente el dominio de nuestra pagina para entrar con sus credenciales

server.get('/user', (req, res) => {       //esta es la ruta GET a /github/user, que pregunta si hay algo en req.user, responda con ese Data
      if(req.user) {                      //de los contrario responde un "false", asi el front sabe si hay o no datos de un usuario de gitHub
          
          res.send(req.user) 
      }
      else res.send(false)
})

server.post("/logout", (req, res)=>{    //ruta POST para hacer el logout y destruir la cookie con la session del usuario de gitHub
  req.logOut();
  req.session.destroy(function (err) {
    res.send("Succesfull Out");
  });
});

module.exports = server;