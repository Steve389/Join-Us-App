var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "join_us",
    port: "3306"
    })
    

// app.get("/", function(req, res){
//     res.send("HELLO FROM OUR WEB APP!");
//    });

app.get("/joke", function(req, res){
    var joke = "What do you call a dog that does magic tricks? A labracadabrador.";
    res.send(joke);
   });  

app.get("/", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM users';
    connection.query(q, function (error, results) {
    if (error) throw error;
    var count = results[0].count;
    // var msg = "We have " + results[0].count + " users";
    // res.send(msg);
    res.render("home", {count: count});
    });
});

app.post("/register", function(req, res){
var person = {
    email: req.body.email
};
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.redirect("/")
    });
});

   
app.listen(5000, function() {
    console.log("Server running on 5000!")
})
