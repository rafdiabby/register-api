const express = require('express')
// const cors = require('cors')

const app = express();
// app.use(cors()); //cors enabled

const authRoute = require("./routes/auth");

require('dotenv').config();
app.use(express.json());

app.use("/auth",authRoute);

app.get("/", (req, res) => {
    res.send("ITS WORKING")
})

app.listen((8080),()=>{
    console.log("listening on port 8080");
});

module.exports = app;
