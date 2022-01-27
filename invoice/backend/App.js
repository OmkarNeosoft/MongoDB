const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5555;
const postRoutes = require("./routes/postRoutes");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(postRoutes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = "mongodb://localhost:27017/Invoice";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("database connected");
    } catch (err) {
        console.log(err.message);
    }
};
connectDB();

app.get("/", (req, res) => {
    Users.find({}, (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Working on port ${port}`);
});
