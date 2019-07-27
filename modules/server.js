const http = require("http"),
  colors = require("colors"),
  handlers = require("./handlers");

function checkURL(url, request, response) {
  switch (true) {
    // case /\//.test(url):
    case url === "/":
    case url === "/start":
      handlers.welcome(request, response);
      break;
    case url === "/upload":
      handlers.upload(request, response);
      break;
    case /([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(url):
      handlers.show(request, response, url);
      break;
    default:
      handlers.error(request, response);
      break;
  }
}
function start() {
  function onRequest(request, response) {
    console.log("Odebrano zapytanie.".green);
    console.log("Zapytanie " + request.url + " odebrane.");

    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

    checkURL(request.url, request, response);
  }

  http.createServer(onRequest).listen(9000);

  console.log("Uruchomiono serwer!".green);
}

exports.start = start;
