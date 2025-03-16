require('dotenv').config()
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));
// enable cors
app.use(cors());
app.options('*', cors());

// parse requests of content-type - application/json
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced database.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.render('home.ejs');
});

require("./routes/tutorial.routes")(app);
require("./routes/tutorial.api")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
