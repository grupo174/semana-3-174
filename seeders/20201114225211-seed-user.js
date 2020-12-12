'use strict';

// Necesitamos bcrypt
const bcrypt = require('bcryptjs');
const config = require("../secret/config.js");

module.exports = {
    up: async(queryInterface, Sequelize) => {

        let salt = 10;
        let clavesPlanas = ["123456", "654321", "micontraseña"];
        let clavesEncriptadas = []
        clavesPlanas.forEach(clave => clavesEncriptadas.push(bcrypt.hashSync(clave, salt)));

        return queryInterface.bulkInsert("user", [
          {
            name: "Juan Perez",
            email: "jperez@ejemplo.com",
            password: clavesEncriptadas[0],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Tomas Gomez",
            email: "tomas.gomez@uncorreo.com",
            password: clavesEncriptadas[1],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "carlos",
            email: "ejemplo@gmail.com",
            password: clavesEncriptadas[2],              
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user', null, {});

    }
};