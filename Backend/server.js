const express = require("express");
    const cros = require("cors");
    const mysql = require("mysql");
const app = express();

app.use(cors());

mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"W7301@jqir#",
    database: "StdMgtSystem"
})

app.get("/", (req, res)=>{
    res.json("Helloo from Backend");
})

app.listen(8081, ()=>{
    console.log("listening");
})