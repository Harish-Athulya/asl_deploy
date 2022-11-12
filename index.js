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


app.post("/login/validate", function(req, res) {
    console.log('receiving data...');
    var eid = req.body.employeeid;
    var epwd = req.body.password;
    // console.log(eid);
    // console.log(epwd);

    var countQuery = `SELECT COUNT(name) AS numrows FROM login WHERE emp_id = '${eid}' and password = '${epwd}'`;

    connection.query(countQuery, (err, results, fields) => {
        if(err) throw err;
        // pushToResponse("data", req.body);
        var obj = {};
        
        if(results[0].numrows == 0) {
            // console.log("Harish");
            obj['message'] = "Failure";
            // pushToResponse("message", "Success");
            // validateResponse.push("message : Success");
        }
        else if(results[0].numrows == 1) {
            // console.log("Athulya");
            obj['message'] = "Success";
            // pushToResponse("message", "Failure");
            // validateResponse.push("message : Failure");
        }
        obj['data'] = req.body;
        validateResponse.push(obj);
        res.send(validateResponse);       
    })
    
    
});




app.listen(process.env.PORT || 5000);


