// server.js
// where your node app starts

// require third part dependencies and declare express app
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// API Project: Timestamp Microservice
/**
 * @function isValidDate
 * @description permit to identify if the argument to pass to the function is a javascript
 * @param {*} date to test
 * @returns {!boolean}
 */
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}


// This route makes it possible to check if the date pass in parameters of the request is valid
app.get("short-alvarezsaurus/api/timestamp/:date_string?", async(req, res) => {
  let dateReceived = req.params["date_string"];

  if (!Reflect.has(req.params, ["date_string"])) {
    dateReceived = Date.now();
  } else if (!isValidDate(new Date(dateReceived))) {
    //Express send
    res.status(400).json({ error: "Invalid Date" });
    //Polka send
    // send(res, 400, { error: "Invalid Date" });
  }

  dateReceived = new Date(dateReceived);
  //Express send
  res.json({
    unix: dateReceived.getTime(),
    utc: dateReceived.toUTCString()
  })
  //Polka send
  // send(res, 200, {
  //   unix: dateReceived.getTime(),
  //   utc: dateReceived.toUTCString()
  // });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
