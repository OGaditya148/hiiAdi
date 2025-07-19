const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
    main ().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Contact');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 80;
const path = require("path");
const fs = require("fs");
const hostname = "127.0.0.1";

const contactSchema = new mongoose.Schema({
    name: String,
    Number: String,
    Age: String,
    email: String,
    adhaar: String,
    pan: String,
    address: String
  });
const contactUs = mongoose.model('contactUs', contactSchema);

const loginSchema = new mongoose.Schema({
    name: String,
    Number: String,
    email: String,
    adhaar: String,
    pan: String
});
const LoginIn = mongoose.model('LoginIn', loginSchema);

app.use("/static", express.static("static"));
app.use(express.urlencoded());
// set the templates as pug
app.set("view engine", "pug");

// set the views directory
app.set('views', path.join(__dirname, 'templates'));
// our pug directory endpoint
app.get("/demo", (req, res) => {
    res.status(200).render('demo', { title: 'Hey Adi', message: 'Hello there!' })
});
app.get("/home", (req, res) => {
     const home = fs.readFileSync("./index6.html");
    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    res.send(home);
});
app.get("/pug", (req, res) => {
    const con = "pug is one of the best template engine and its freely available on internet with all its directories and modules"
    const params = {"title":"Pug:-A free and open source template engine ","content":con}
    res.status(200).render("index.pug",params)
})
app.get("/", (req, res) => {
    const home = fs.readFileSync("./index6.html");
    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    res.send(home);
});
app.get("/about", (req, res) => {
    const about = fs.readFileSync("./about2.html");
    res.setHeader("content-type", "text/html");
    res.status(200).send(about);
});
app.post("/about", (req, res) => {
    const home = fs.readFileSync("./index6.html");
    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    res.send(home);
})
app.get("/contact", (req, res) => {
    const contact = fs.readFileSync("./contact2.html");
    res.setHeader("content-type", "text/html");
    res.status(200).send(contact);
});
app.post("/contact", (req, res) => {
    var myData = new contactUs(req.body);
    myData.save().then(() => {
        res.send("Your Data is Submitted Successfully in to the Database...");
    }).catch(() => {
        res.status(404).send('Your Data is not Submitted to the Database...');
    });
});
// app.get("/", (req, res) => {
//     res.send("Your Form is Submitted Successfully...!")
// })
app.get("/Login", (req, res) => {
    const Login = fs.readFileSync("./login.html");
    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    res.send(Login);
});
app.post("/login", (req, res) => {
    var myData = new LoginIn(req.body);
    myData.save().then(() => {
        res.send("You Successfully Logged in to the Database...");
    }).catch(() => {
        res.status(404).send('Oops!...Your Login request is get Failed...');
    });
});
app.post("/reset", (req, res) => {
    const Login = fs.readFileSync("./login.html");
    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    res.send(Login); 
});
app.get("/service", (req, res) => {
    const service = fs.readFileSync("./service2.html");
    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    res.send(service);
});
app.post("/service", (req, res) => {
    const home = fs.readFileSync("./index6.html");
    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    res.send(home);
});
app.post("/this", (req, res) => {
    res.status(404).send("This page is not found on My Website ")
});
app.listen(port,()=>{
    console.log(`Server is running at http://${hostname}: ${port}/`);
})