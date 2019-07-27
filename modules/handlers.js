const fs = require("fs"),
  formidable = require("formidable");

exports.upload = function(request, response) {
  console.log("Rozpoczynam obsługę żądania upload.");
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    let path = encodeURI("img/" + files.upload.name);
    fs.renameSync(files.upload.path, encodeURI("./img/" + files.upload.name));
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("received image:<br/>");
    response.write("<img src='" + path + "' />");
    response.end();
  });
};

exports.welcome = function(request, response) {
  console.log("Rozpoczynam obsługę żądania welcome.");
  fs.readFile("templates/start.html", function(err, html) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.write(html);
    response.end();
  });
};

exports.show = function(request, response, url) {
  fs.readFile("." + url, "binary", function(error, file) {
    if (!error) {
      response.writeHead(200, { "Content-Type": "image/png" });
      response.write(file, "binary");
    } else {
      response.writeHead(200, { "Content-Type": "image/png" });
      response.write("./img/test.png", "binary");
    }
    response.end();
  });
};

exports.error = function(request, response) {
  console.log("Nie wiem co robić.");
  response.write("404 :(");
  response.end();
};
