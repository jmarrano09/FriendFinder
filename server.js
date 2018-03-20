const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");


// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// connection.connect((err) => {
//   if (err) {
//     console.error(`error connecting: ${err.stack}`);
//     return;
//   }

//   console.log(`connected as id ${connection.threadId}`);
// });


require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// App listen
app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});
