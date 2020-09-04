const express = require("express");
const app = express();
// -------------------------------------------

//---- Connect routers
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

//---- Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Running on PORT ${PORT}`));
