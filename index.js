var express = require('express');
var app = express();
var cors = require('cors');
var database = require('./config/database');
var port = process.env.PORT || 3005;

// Conectarse a la base de datos
database.connect((err) => {
    if (err) throw err;
});

// Esto es para permitir api para compartir recursos de origen cruzado
app.use(cors());

// Esto es para permitir que la api analice json
app.use(express.json());

// Esto es para permitir que api reciba datos de una aplicación cliente.
app.use(express.urlencoded({
    extended: true
}));

// Registrar rutas en el main index.js
app.use('/', [
    require('./routes/task'),
    require('./routes/auth'),
    require('./routes/lista')
]);





app.listen(port, () => {
    console.log(`Escuchando at http://localhost:${port}`);
});
