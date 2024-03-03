const path = require("path");
const express = require("express");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogdb').then(e => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render("home");
});

app.use('/user', userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));