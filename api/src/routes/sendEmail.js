const server = require("express").Router();
const {Product, Categories, Image, Reviews, Users, Order, Orderline, } = require("../db.js");
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');

server.post('/', (req, res) =>{

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cyberfitnessweb@gmail.com',   //cyberfitnessweb@gmail.com 
            pass: 'ciber12345'                   //OJO ESTOS DATOS DEBEN IR EN .ENV COMO DATOS OCULTOS PORQUE SON SENSIBLES
        }
    })

    const options = {
        viewEngine: {
          partialsDir: __dirname + "/views/partials",
          layoutsDir: __dirname + "/views/layouts",
          extname: ".hbs"
        },
        extName: ".hbs",
        viewPath: "views"
      };

      transporter.use("compile", hbs(options));

    const emailType = req.body.emailType
    let mailOptions;

    if(emailType === 'welcome'){

        mailOptions = {
            from: 'Cyberfitness@gmail.com',
            to: req.body.user.email,
            subject: 'Welcome',
            html: 
            `<div id="container" style="width: 100%; font-family: sans-serif; font-weight: normal;">
                <div style="width: 100%; max-width: 700px; margin: auto;">
                    <div style="background-color: #8e2de2; text-align: center; padding: 0.7rem 0;">
                        <h1 style="color: white; font-family: sans-serif; font-weight: normal;">CyberFitness</h1>
                     </div>
            
          <div style="text-align: center; padding: 0 0.72rem; padding-top: 2.5rem; background-color:white">
          <p style="color: #4f5154; margin-bottom: 1.4rem; font-size: 1rem;">&iexcl;
                                    Welcome   `+ req.body.user.name +`  ` + req.body.user.lastname + `  !` 
        };
    }else if(emailType === 'forgotPassword') {

        mailOptions = {
            from: 'Cyberfitness@gmail.com',
            to: req.body.user.email,
            subject: 'Password Reset Link',
            html: 
            `<div id="container" style="width: 100%; font-family: sans-serif; font-weight: normal;">
                <div style="width: 100%; max-width: 700px; margin: auto;">
                    <div style="background-color: #8e2de2; text-align: center; padding: 0.7rem 0;">
                        <h1 style="color: white; font-family: sans-serif; font-weight: normal;">CyberFitness</h1>
                     </div>
            
          <div style="text-align: center; padding: 0 0.72rem; padding-top: 2.5rem; background-color:white">
          <p style="color: #4f5154; margin-bottom: 1.4rem; font-size: 1rem;">&iexcl;
                                    Hi   `+ req.body.user.name +`  ` + req.body.user.lastname + `  !` +
             `This is your recovery password Link, remember is Single use ` + `http://localhost:3000/user/forgotPassword/?`+ req.body.user.emailHashed + ` ` +
             `Do not share this link`
        };
 
 

    } else if(emailType === 'sendPurchase') {
        console.log('llega  ', req.body)
        const {user, info} = req.body
        mailOptions = {
            from: 'Cyberfitness@gmail.com',
            to: user.email,
            subject: 'Purchase Detail',
            html: 
            `<div id="container" style="width: 100%; font-family: sans-serif; font-weight: normal;">
                <div style="width: 100%; max-width: 700px; margin: auto;">
                    <div style="background-color: #8e2de2; text-align: center; padding: 0.7rem 0;">
                        <h1 style="color: white; font-family: sans-serif; font-weight: normal;">CyberFitness</h1>
                     </div>
            
          <div style="text-align: center; padding: 0 0.72rem; padding-top: 2.5rem; background-color:white">
          <p style="color: #4f5154; margin-bottom: 1.4rem; font-size: 1rem;">&iexcl;
                                    Hi ${user.name}  ${user.lastname}  !
             <h3>Your Purchase: </h3>
             Oder N° ${info.orderId}
             <hr>
             <h3>Your Products:</h3>
             <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>total</th>
                </tr>
                </thead>
                <tbody>
                    ${info.products && info.products.map( e => 
                        e.name + '  ' +
                        e.quantity + '  '+
                        e. price + '   '
                    )}
                        
                </tbody>
                </table>
                <hr>
                <h3>Total Price: ${info.totalPrice}</h3>
             
             Thank you for your purchase!!`
        };
 
    }
    
 

    transporter.sendMail(mailOptions)
})




module.exports = server;
