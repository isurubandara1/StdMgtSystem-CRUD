const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"W7301@jqir#",
    database: "StdMgtSystem"
});

app.get("/", (req, res)=>{
    res.json("Hello from Backend");
});

app.listen(8081, ()=>{
    console.log("listening on port 8081");
});
