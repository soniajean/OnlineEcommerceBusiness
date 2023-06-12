//importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

//firebase admin setup
let serviceAccount = require("./store-aa214-firebase-adminsdk-2kwzl-1993995ced.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//declare static path
let staticPath = path.join(__dirname, "public");

//initializing  express.js
const app = express();

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

//routes
//home route
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

//signup route
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})

app.post('/signup', (req, res) => {
    let {name, email, password, number, tac, notification} = req.body;

    //form validations
    if(name.length < 3){
        return res.json({'alert': 'name must be 3 letters long'});
    } else if (!email.length){
        return res.json ({'alert': 'enter your email'});
    } else if(password.length < 8){
        return res.json({'alert': 'password should be 8 letters long'});
    } else if (!number.length){
        return res.json({'alert': 'enter your phone number'});
    } else if (!Number(number) || number.length < 10){
        return res.json({'alert': 'invalid number, please enter a valid one'});
    }else if (!tac.checked){
        return res.json({'alert': 'you must agree to the terms and conditions'});
    }else { 
        // 
    }


    res.json('data received');
})

//404 route
app.get("/404", (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})
app.use((req, res) => {
    res.redirect('/404');
})
    

app.listen(3000, () => {
    console.log('listening on port 3000 ...');
})