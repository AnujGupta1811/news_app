var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err; // Handle connection error
  console.log("Connected!");

  // Correct SQL query to create a database with backticks
  con.query("CREATE DATABASE `news-website`", function (err, result) {
    if (err) throw err; 
    console.log("Database created");
  });  
});
