var express = require('express');
var app = express();

app.get("/asl", (req, res) => {
    console.log("Athulya Senior Care");
    res.send("Harish");
})


app.listen(process.env.PORT || 5000);


