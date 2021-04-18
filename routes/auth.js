var express = require('express');
var app = express();
var database = require('../config/database');
var authValidations = require('../validations/auth');

//Maneja la autenticación para los usuarios.
app.post('/authenticate', (req, res) => {

    //Obtenga el correo electrónico y la contraseña descifrados de los encabezados
    let requestBody = getCredentialsFromHeaders(req);

    //Validación de nuestras autenticaciones usando la biblioteca Joi npm
    const { error } = authValidations(requestBody)

    if (error) {
        res.json({
            id : "",
            message: error.details[0].message
        })
    } else {
        let sql = `SELECT id FROM users WHERE email = '${requestBody.email}' AND password = '${requestBody.password}'`;

        database.query(sql, (err, result) => {
            if (err) {
                res.status(400).send(err);
                return;
            }

            if (result.length) res.json(result[0]);
            else res.json({
                id : "",
                message : "¡Nombre de usuario o contraseña incorrectos!"
            });

        });
    }

});

// Obtenga la credencial del usuario de los headers
function getCredentialsFromHeaders(req) {

    // Obtenga la autorización de los headers
    let authorization = req.header('authorization');

    // Convertir autorización en matriz
    let authData = authorization.split(" ");

    // Convierta a utf-8
    let token = Buffer.from(`${authData[1]}`, 'base64').toString('utf8');

    // Convertir token en matriz
    let credentials = token.split(":");

    return {
        email: credentials[0],
        password : credentials[1]
    }
}

module.exports = app;
