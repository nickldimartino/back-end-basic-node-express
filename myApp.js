// Given to create Express app object
let express = require('express');
let app = express();

// Question #11: Use body-parser to Parse POST Requests
let bodyParser = require('body-parser');

// Question #1: Print to the Node Console
// Node is a JS environment
console.log("Hello World");

/* Question #2: Start a Working Express Server
// Route structure: app.METHOD(PATH, HANDLER)
// METHOD: an HTTP method 
// PATH: a relative path on the server
// HANDLER: a function that Express calls wen the route // is matched
// HANDLER is a function with two params (req, res)
// res.send() serves the string "Hello Express"
app.get('/', (req, res) => {
  res.send("Hello Express");
});
*/

// Question #7: Implement a Root-Level Request Logger Middleware
// Middleware functions take 3 arguments (req, res, next)
// Next is the next function in app's req-res cycle
// Mount middleware with app.use(middlewareFunction)
// This route prints the Method, Path, and IP for a
// request and calls the next one
// Without next(), the server will be stuck because the 
// middleware intercepted th req
// Middleware must be mounted before the routes that
// depend on it.
app.use(function middleware(req, res, next) {
  let string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

// Question #3: Serve an HTML File
// A GET route that responds with a file at the specified path
// __dirname is a Node global variable 
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Question #4: Serve Static Assets
// Styelsheets, scripts, and images are static assets
// needed by users.
// express.static(path) is a middleware to place static
// assets.
// Middleware are functions that intercept route handlers
// adding info. They must be moounted using app.use(path,
// middlewareFunction). Path is optional to execute for
// all requests.
app.use("/public", express.static(__dirname + "/public"));

/* Question #5: Serve JSON on a Specific Route
// JSON represents a JS object as a string for easy 
// transmit.
// This API responds with JSON at the '/json' path
app.get('/json', (req, res) => {
  res.json({
    "message": "Hello json"
  });
});
*/

// Question #6: Use the .env File
// .env is a hidden file that is used to pass environment
// variables to your application. Only visible to you
// .env vars accessed by process.env.VAR_NAME
// For Replit, the Secrets tab holds the variables
// A GET route handler setting the .env variable to 
// uppercase if the var holds the string "uppercase" and
// returning the JSON string
app.get("/json", (req, res) => {
  var response = { "message": "Hello json" };

  if (process.env.MESSAGE_STYLE === "uppercase") {
    response.message = response.message.toUpperCase();
  }

  res.json(response);
});

// Question #8: Chain Middleware to Create a Time Server
// Middleware can be chained within a route definition
// to split server ops into smaller units
// This route gets the request's date and then sends 
// the JSON string
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

// Question #9: Get a Route Parameter Input from the Client
// GET route mounted on the path '/:word/echo' that
// responds with a JSON string  object
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

// Question #10: Get Query Parameter Input from the Client
// API endpoint mounted at GET '/name' that responds with 
// a JSON object
// The object uses querying to get the string values
app.get("/name", (req, res) => {
  let firstName = req.query.first;
  let lastName = req.query.last;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

// Question #11: Use body-parser to Parse POST Requests
// POST requests sen client data with HMTL forms
// Data is hidden in the request body (aka payload)
// body-parser allows a series of middleware to decode 
// data in different formats
// extended=false limits values to only strings or arrays
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Question #12: Get Data from POST Requests
// A route that mounts a POST handler at '/name', and
// responds with JSON object containing the HTML form's
// body's first and last name
app.post('/name', (req, res) => {
  let firstName = req.body.first;
  let lastName = req.body.last;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

module.exports = app;