const server = require("express").Router();
const {Product, Categories, Image, Reviews, Users, Order, Orderline, } = require("../db.js");
const nodemailer = require("nodemailer");

server.post('/', (req, res) =>{

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cyberfitnessweb@gmail.com',   //cyberfitnessweb@gmail.com 
            pass: 'ciber12345'                   //OJO ESTOS DATOS DEBEN IR EN .ENV COMO DATOS OCULTOS PORQUE SON SENSIBLES
        }
    })

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
 
 

    }
 
    
    
 

    transporter.sendMail(mailOptions, (err, data) =>{
        if(err){
            res.send(err.message)
        }
        else{
            res.send("email has been send");
        }
    })
    res.send("email has been send");
})




module.exports = server;
