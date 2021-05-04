var request = require("request");
const fs = require("fs");

let url: string = "http://www.ferra.ru/ru/techlife/news/";
let html: string = "";
const http = require("http");
const port = 3000;
let POST: object = {};


// содежимое index.js

const requestHandler = (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);

    fs.readFile("public/word.html", function (err, page) {
      if (err) {
        throw err;
      }
      html = page;
    });

    res.write(html);

    req.on("data", function (data) {
      data = data.toString();
      data = data.split("&");
      for (var i = 0; i < data.length; i++) {
        var _data = data[i].split("=");
        POST[_data[0]] = _data[1];
      }
    });

    console.log(POST["userWord"]);

    request(url, function (err, resp, body) {
      if (err) throw err;
      res.end(body);
      console.log(resp.statusCode);
    });
    
    // res.end(POST["userWord"]);
  } else {
    fs.readFile("public/index.html", function (err, page) {
      if (err) {
        throw err;
      }
      html = page;
    });
    res.write(html);
    res.end();
  }
};

const server = http.createServer(requestHandler);
server.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});
