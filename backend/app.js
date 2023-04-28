const express = require("express");
const dotenv = require("dotenv").config({path:"./config/config.env"})
const app = express();
const database = require('./db');
const user = require("./routes/userroute")
const food = require("./routes/displaydata")
const order = require("./routes/orderroutes")


// dotenv.config({path:"backend/config/config.env"});
const port = process.env.PORT_NUM;
const host= process.env.HOST;
const server = "http://localhost:4567/"

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    res.setHeader('Access-Control-Allow-Credentials',true)
    next()
})

app.use(express.json());
app.use("/api/v1",user);
app.use("/api/v1",food);
app.use("/api/v1",order);
database();


app.listen(port,host,()=>{
    console.log(`server coonected on http://${host}:${port}`)
})
