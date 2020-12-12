const config = require("../secret/config.js");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
  console.log(req.body);

  email = req.body.email;
  clave = req.body.password;

  if (email && clave) {
    db.user
      .findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          return res.status(404).send("User Not Found.");
        }
        var passwordIsValid = bcrypt.compareSync(
          clave,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            auth: false,
            accessToken: null,
            reason: "Invalid Password!",
          });
        }
        var token = jwt.sign(
          { id: user.id, name: user.name, email: user.email },
          config.secret,
          {
            expiresIn: 86400, // expires in 24 hours
          }
        );
        res.status(200).send({ auth: true, accessToken: token });
      })
      .catch((err) => {
        res.status(500).send("Error -> " + err);
      });
  }
  else {
    return res.status(404).send("User Not Found.");
  }
};
