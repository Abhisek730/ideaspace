const express = require('express');
const app = express()
const port = 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const mongoUrl = "mongodb+srv://ashu:U92zmo6s27b5brI9@cluster0.re3rzqw.mongodb.net/?retryWrites=true&w=majority"
const path = require("path")

app.use(cors())
require('./models/model')
app.use(express.json())
app.use(require("./routes/idea"))
mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo")
})

mongoose.connection.on("error", () => {
    console.log("not connected to mongodb")
})

// serving the frontend
app.use(express.static(path.join(__dirname, "./build")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})


app.listen(port, () => {
    console.log("server is running on port" + " " + port)

})