const passport = require('passport');                           //AQUI SE HACE EL SETUP de passport authentication
const GitHubStrategy = require('passport-github2').Strategy;    //Se importa la estrategia de gitHub 2.0 
passport.use(new GitHubStrategy({                      //se habilita a passport para que utilice la estrategia de autenticacion con gitHub  
    clientID: "196e674abb22a6c1b3f5",                  //estas credenciales son unicas las pueden habilitar en github.com/settings/applications/ 
    clientSecret: "cf3148b8050638102eb94b5ee195394943eac347", //-> leer documentacion sobre como realizar OAuth con gitHub    
    callbackURL: "http://localhost:4000/gitHub/callback" //funcion de callback donde llegara toda la info del usuario autenticado
  },
  function(accessToken, refreshToken, profile, done) {    //esta funcion autentica al usuario de gitHub automaticamente y me retorna el perfil completo
        return done(null, profile);
  }
));

passport.serializeUser(function(user, done) { //aqui se serializa el usuario, por lo general solo odeberia serializarse el ID para enviarlo
    done(null, user);                         //al browser y que la cookie no sea tan grande pero como aun no lo tenemos en nuestra DB
  });                                         //serializamos todo el perfil del usuario y lo enviamos en la cookie al browser
  
passport.deserializeUser(function(user, done) {//aqui por lo general se recibe solo el ID del usuario que viene en la cookie del browser
    done(null, user);                         //para luego buscarlo en nuestra DB y asi poder leer su informacion, pero como no tenemos
});                                           //al usuario de gitHub guardado en nuestra DB aun, lo deserializamos todo y 
                                              //lo entregamos en el req.user automaticamente