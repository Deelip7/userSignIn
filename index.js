const path = require("path");
const fs = require("fs");
const http = require("http");
const queryString = require("querystring");

const server = http.createServer((req, res) => {
  console.clear();
  if (req.method === "POST") {
    collectRequestData(req, res);
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

function collectRequestData(req, res) {
  const FORM_URLENCODED = "application/x-www-form-urlencoded";

  if (req.headers["content-type"] === FORM_URLENCODED) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      body = queryString.parse(body);
      bodyEmail = JSON.stringify(body.email);
      bodyPassword = JSON.stringify(body.password);

      console.log(bodyEmail, bodyPassword);
    });
    res.end(`<h1>Request Send</h1>`);
  }
}
const PORT = process.env.PORT || 5000;

server.listen(PORT);
