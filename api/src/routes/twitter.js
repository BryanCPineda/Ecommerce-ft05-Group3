const server = require("express").Router();
const passport = require('passport')

server.get('/twithome', (req, res) => {
    res.json({
        location: "home in twitter strategy"
    })
})

server.get('/',
    passport.authenticate('twitter'))

server.get('/callback',
    passport.authenticate('twitter', { failureRedirect: '/twitter' }),
    (req, res) => {
          // Successful authentication, redirect home.
        res.redirect('http://localhost:3000/user/catalogo')
    })

module.exports = server; 