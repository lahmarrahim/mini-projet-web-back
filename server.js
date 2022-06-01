const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const path = require("path");
const logger = require("morgan")

var corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
  optionSuccessStatus :200,
};

app.use(logger('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE , PATCH"
  );
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

app.use(cors(corsOptions));

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const nodemon = require("nodemon");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connecté à la base de données!");
  })
  .catch(err => {
    console.log("Impossible de se connecter à la base de données!", err);
    process.exit();
  });

  app.get('/upload/*:filename*', (req, res) => {
    console.log(__dirname)
    res.sendFile(
      path.join(__dirname, '../ProductApiWebUpload/upload', req.path.substring(8, req.path.length))
    )
  })

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue dans l'application Informatique." });
});

require("./app/routes/produits.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}.`);
});
