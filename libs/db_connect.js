const mongoose = require("mongoose");
const User = require("./db_model");

// -----------------------------------------------------

mongoose.connect("mongodb+srv://user7:user7@cluster0.gthxj.mongodb.net/<dbname>?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err) console.error(err);
  else console.log("Connected to the mongodb");
});

const note = new Note({
  userEmail: userE,
  userPassword: userP,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});
