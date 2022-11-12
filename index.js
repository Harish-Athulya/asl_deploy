var express = require('express');
var app = express();
const connection = require('./utils/conn.js')


app.get("/asl", (req, res) => {
    console.log("Athulya Senior Care");
    res.send("Harish");
});

app.get("/login", (req, res) => {
    console.log("Inside login");
    
    connection.query('SELECT user_id FROM users', function (error, results, fields) {
        if (error) throw error;
        console.log('The result is: ', results[0]);
        var usr_id = results[0];
        res.send(usr_id);
    });
    
    
});


app.listen(process.env.PORT || 5000);


