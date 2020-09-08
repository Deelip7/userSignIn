const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// ---- Serving static CSS and Image files
app.use(express.static(__dirname + "/public"));

//---- Passport Config
require("./config/passport")(passport);
// ---- MongoDB Config
const db = require("./config/keys").MongoURI;

// ---- Connect to DB
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// --- Body Parser
app.use(express.urlencoded({ extended: false }));

// ---- Express Session
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

// ---- Passport
app.use(passport.initialize());
app.use(passport.session());

// ---- Connect Flash
app.use(flash());

// ---- Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// ---- EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// ---- Connect routers
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// ---- Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Running on PORT ${PORT}`));
