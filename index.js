const path = require("path");
const express = require("express");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogdb').then(e => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get('/', (req, res) => {
    res.render("home", {
        user: req.user,
    });
});

app.use('/user', userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));