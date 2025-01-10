var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "first_node_database"

});


    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      con.query("CREATE TABLE `registration` (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), password VARCHAR(255))", function (err, result) {
        if (err) throw err;
        console.log("Table Created");
      })
    });
    
  
  