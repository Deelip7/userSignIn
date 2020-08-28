const path = require("path");

const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    console.log("working");
    fs.readFile(path.join(__dirname, "public", "index.html"), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { "content-type": "text/html" });
      res.end(content);
    });
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server running on port: ${PORT}`));
