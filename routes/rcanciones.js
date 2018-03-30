module.exports = function(app, swig, gestorBD) {

	app.post("/cancion", function(req, res) {
		// res.send("Canción agregada:" + req.body.nombre + "<br>" + " genero :"
		// + req.body.genero + "<br>" + " precio: " + req.body.precio);
		var cancion = {
			nombre : req.body.nombre,
			genero : req.body.genero,
			precio : req.body.precio
		}
		// Conectarse
		gestorBD.insertarCancion(cancion, function(id) {
			if (id == null) {
				res.send("Error al insertar ");
			} else {
				if (req.files.portada != null) {
					var imagen = req.files.portada;
					imagen.mv('public/portadas/' + id + '.png', function(err) {
						if (err) {
							res.send("Error al subir la portada");
						} else {
							if (req.files.audio != null) {
								var audio = req.files.audio;
								audio.mv('public/audios/'+id+'.mp3', function(err) {
									if (err) {
										res.send("Error al subir el audio");
									} else {
										res.send("Agregada id: "+ id);
									}
								});
							}
						}
					});
				}
			}
		});
	});
	
	app.get("/tienda", function(req, res) {
		gestorBD.obtenerCanciones( function(canciones) {
			if (canciones == null) {
				res.send("Error al listar ");
			} else {
				var respuesta = swig.renderFile('views/btienda.html',
				{
					canciones : canciones
				});
				res.send(respuesta);
			}
		});
	});

	app.get("/canciones", function(req, res) {

		var canciones = [ {
			"nombre" : "Blank space",
			"precio" : "1.2"
		}, {
			"nombre" : "See you again",
			"precio" : "1.3"
		}, {
			"nombre" : "Uptown Funk",
			"precio" : "1.1"
		} ];

		var respuesta = swig.renderFile('views/btienda.html', {
			vendedor : 'Tienda de canciones',
			canciones : canciones
		});

		res.send(respuesta);

	});

	app.get('/canciones/agregar', function(req, res) {
		var respuesta = swig.renderFile('views/bagregar.html', {});
		res.send(respuesta);
	})

	app.get('/canciones/:id', function(req, res) {
		var respuesta = 'id: ' + req.params.id;
		res.send(respuesta);
	})

	app.get('/canciones/:genero/:id', function(req, res) {
		var respuesta = 'id: ' + req.params.id + '<br>' + 'Genero: '
				+ req.params.genero;
		res.send(respuesta);
	})

};