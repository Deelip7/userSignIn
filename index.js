const path = require("path");
const fs = require("fs");
const http = require("http");
const queryString = require("querystring");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://user7:user7@cluster0.gthxj.mongodb.net/<dbname>?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err) console.error(err);
  else console.log("Connected to the mongodb");
});

// const PostSchema = mongoose.Schema({
//   userEmail: String,
//   userPassword: String,
// });
const noteSchema = new mongoose.Schema({
  // content: String,
  // date: Date,
  // important: Boolean,
  userEmail: String,
  userPassword: String,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is Easy",
  date: new Date(),
  important: true,

  userEmail: String,
  userPassword: String,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});
// -------------------------------------------

const server = http.createServer((req, res) => {
  console.clear();
  if (req.method === "POST") {
    getRequestData(req, res);
  } else if (req.method === "GET") {
    sendRequestContent(req, res);
  }

  //Send respond if request is GET -------------------------------------------
  function sendRequestContent(req, res) {
    const filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);

    const pathExtensionName = path.extname(filePath);

    let contentType = "text/html";

    //Dynamic build File path -------------------------------------------
    switch (pathExtensionName) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
    }

    //Read File-------------------------------------------
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.writeHead(404, { "content-type": contentType });
          res.end(`<h1> 404 | Page Not Found!</h1>`);
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { "content-type": contentType });
        res.end(content, "utf-8");
      }
    });
  }
});

function getRequestData(req, res) {
  const FORM_URLENCODED = "application/x-www-form-urlencoded";

  if (req.headers["content-type"] === FORM_URLENCODED) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      parseRequestData(body);
    });
    res.end(`<h1>Request Send</h1>`);
  }
}
const PORT = process.env.PORT || 5000;

function parseRequestData(body) {
  userSignInData = queryString.parse(body);
  userSignInEmail = JSON.stringify(userSignInData.email);
  userSignInPassword = JSON.stringify(userSignInData.password);

  const userInput = new UserData(userSignInEmail, userSignInPassword);
  addData(userInput);
}

class UserData {
  constructor(userEmail, userPassword) {
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }
}

let storeUserDataArray = [];
function addData(data) {
  let userE = data.userEmail;
  let userP = data.userPassword;
  storeUserDataArray.push({ userE, userP });
  console.log(storeUserDataArray);
}

server.listen(PORT);
