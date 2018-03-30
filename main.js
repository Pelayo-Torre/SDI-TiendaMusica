//Módulos
var express = require('express');
var app = express();

var fileUpload = require('express-fileupload');
app.use(fileUpload());
var mongo = require('mongodb');
var swig = require('swig');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app, mongo);

app.use(express.static('public'));

//Variables 
app.set('port', 8081);
app.set('db', 'mongodb://admin:sdi@ds247058.mlab.com:47058/tiendamusica')


require("./routes/rusuarios.js")(app, swig, gestorBD); // (app, param1, param2, etc.) 
require("./routes/rcanciones.js")(app, swig, gestorBD); // (app, param1, param2, etc.)


//lanzar el servidor
app.listen(app.get('port'), function() {
	console.log("Servidor activo");
});