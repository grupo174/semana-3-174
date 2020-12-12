const controller = require("./controller/controller.js");
const express = require("express");
const db = require("./models");
const app = express();
const bodyParser = require("body-parser");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API ENDPOINTS

app.get("/",  (req, res) => {
  console.log("El Backend Está Funcionando!");
  res.send("Backend funcionando perfectamente!");
});

app.post("/posturl", (req, res) => {
  console.log(req.body);
  res.send("response");
});

app.get("/api/users", (req, res) => {
  db.user.findAll().then((users) => res.json(users));
});

app.post("/api/auth/signin", controller.signin);

const port = 3000;
app.listen(port, () => {
  console.log(`Esperando clientes en el puerto http://localhost:${port}`);
});

module.exports = app;
