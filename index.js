const path = require("path");
const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);

  const pathExtensionName = path.extname(filePath);

  const contentType = "text/html";

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

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "content-type": contentType });
        res.end(`<h1> 404 | Page Not Found!</h1>`);
      }
    }
  });

  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "public", "index.html"), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { "content-type": "text/html" });
      res.end(content);
    });
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server running on port: ${PORT}`));
