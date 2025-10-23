require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/router");
require("./db/conn");
const HPcrud = require("./models/userSchema");


const port = process.env.PORT || 8008;

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//     res.status(201).json("server start")
// })

app.use(router);





// 3re step heruko
// if(process.env.NODE_ENV == "production"){
//     app.use(express.static("client/build"));
// }



app.listen(port, () => {
    console.log(`your port is started at ${port}`);
})