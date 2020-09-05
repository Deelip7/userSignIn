const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// ---- Serving static CSS and Image files
app.use(express.static(__dirname + "/public"));

// ---- EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//---- Connect routers
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

//---- Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Running on PORT ${PORT}`));
