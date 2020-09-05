const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// ---- Serving static CSS and Image files
app.use(express.static(__dirname + "/public"));

// ---- MongoDB Config
const db = require("./config/keys").MongoURI;
// ---- Connect to DB
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// mongoose.connect("mongodb+srv://user7:user7@cluster0.gthxj.mongodb.net/<dbname>?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
//   if (err) console.error(err);
//   else console.log("Connected to the mongodb");
// });

// ---- EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//---- Connect routers

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

//---- Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Running on PORT ${PORT}`));
