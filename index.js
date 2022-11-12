var express = require('express');
const connection = require('./utils/conn.js')
var bodyParser = require('body-parser');

var app = express();

var validateResponse = [];

function pushToResponse(name, val) {
    var obj = {};
    obj[name] = val;
    validateResponse.push(obj);
 }

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to ASL hosting");
});

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
        // res.send(usr_id);
    });
});


app.post("/testlogin/validate", function(req, res) {
    console.log('receiving data...');
    var eid = req.body.employeeid;
    var epwd = req.body.password;
    
    var countQuery = `SELECT COUNT(name) AS numrows FROM login WHERE emp_id = '${eid}' and password = '${epwd}'`;
    
    connection.query(countQuery, (err, results, fields) => {
        if(err) throw err;
        var obj = {};
        
        if(results[0].numrows == 0) {
            obj['message'] = "Failure";
        }
        else if(results[0].numrows == 1) {
            obj['message'] = "Success";
        }
        obj['data'] = req.body;
        res.send(obj);       
    })
});

app.post("/login/validate", function(req, res) {
    console.log('receiving data...');
    var eid = req.body.employeeid;
    var epwd = req.body.password;
    
    var selectQuery = `SELECT * FROM login WHERE emp_id = '${eid}' and password = '${epwd}'`;
    
    connection.query(selectQuery, (err, results, fields) => {
        if(err) throw err;
        var obj = {};      
        obj['data'] = {};
        
        if(results[0] == null) {
            obj['message'] = "Failure";
            obj['data']['employeeid'] = req.body.employeeid;
            obj['data']['dept'] = 'Invalid';
            obj['data']['name'] = 'Invalid';
        }
        else {
            obj['message'] = "Success";
            obj['data']['employeeid'] = req.body.employeeid;
            obj['data']['dept'] = results[0].dept;
            obj['data']['name'] = results[0].name;
        }
        
        res.send(obj);       
    })    
});

app.post("/login/val", (req, res) => {
    var eid = req.body.employeeid;
    var epwd = req.body.password;

    console.log(eid);
    console.log(epwd);
    var selectQuery = `SELECT * FROM login WHERE emp_id = '${eid}' and password = '${epwd}'`;
    
    connection.query(selectQuery, (err, results, fields) => {
        if(err) throw err;
        // console.log(results);
        res.send(results[0].name);
    })
    
});


app.listen(process.env.PORT || 5000);


