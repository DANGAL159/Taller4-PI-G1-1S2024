const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

require('dotenv').config();

router.post('/signup', (req, res) => {
    let user = req.body;
    query = "select email, password, role, status from user where email=?"
    connection.query(query,[user.email],(err, results)=> {
        if(!err){
            if(results.length <= 0){
                query = "insert into users(name,contact, email, password, status, role)value (?,?,?,?, 'false', 'user')"
                connection.query(query, [user.name, user.contact, user.email, user.password],(err, results) => {
                    if(!err){
                        return res.status(200).json({message: "Successfully registered."});
                    } else {
                        return res.status(500).json(err);
                    }
                })
            } else {
                return res.status(400).json({message: "Emaily already exist."});
            } 
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.post('/login', (req, res) => {
    const user = red.body;
    query = "select email, password, role, status from users where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err){
            if(results.length <=  0 || results[0].password != user.password) {
                return res.status(401).json({message: "Incorrect username or password" });
            }else if(results[0].status === "false") {
                return res.status(401).json({message: "Wait for admin approval" });
            }else if (results[0].password == user.password) {
                const response = { email: results[0].email, role: results[0].role};
                const accessToken = jw.sign(response, process.env.ACCESS_TOKEN, {
                    expiresIn: "8h",
                });
                return res.status(200).json({ token: accessToken });
            }else {
                return res.status(400).json({ message: "Something went wrong. Please try again later" });
            }
        }else{
            return res.status(500).json(err);
        }
    });
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


router.post('/forgotpassword', (req, res) => {
    const user = req.body;
    query = "select email, password from users where email?";
    connection.query(query, [user.email], (err, results) =>{
        if(!err){
            if(results.length <=0){
                return res.status(200).json({message: "Passwird sent successfuly to you email."});
            }else{
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'HOLA - RECUPERACIÓN DE ACCESOS',
                    html: '<p><b>Las credenciales del sistema son los siguientes:</b> <br> <b>EMAIL: </b>'+results[0].email+'<br> <b>Clave: </b>'+results[0].password+'<br> <a href = "http://localhost:4200/"> Click para acceder al sistema </a> <p>'
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Email sent successfuly" + info.response);
                    }
                });
                return res.status(200).json({message: "Passwird sent successfuly to you email."});
            }
        }else{
            return res.status(500).json(err);
        }
    });
});
    

module.exports = router;