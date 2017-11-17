<<<<<<< HEAD
// Declaraciones globales
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var env = (process.env.NODE_ENV || "local").toLowerCase();
var cnf = require('./config')[env];
var bIsLocal = (process.env.NODE_ENV == 'local');
var aMsgPlatos = [];

// 
var allowedOrigins = cnf.clients;
//var path ='/stomp'; // you need this if you want to connect to something other than the default socket.io path
var sio_server = io(server, { origins: allowedOrigins/*, path : path*/});

// estableciendo directorio de elementos estaticos
app.use(express.static('public'));

// Url para ver variable de entorno NODE_ENV
app.get('/node_env', function(req, res) {
    res.status(200).send("process.env.NODE_ENV: " + process.env.NODE_ENV);
});

// Limpiando cola de cocina
app.get('/cocina/limpiar-cola', function(req, res) {
    aMsgPlatos = [];
    res.status(200).send("Cola de platos: " + aMsgPlatos.length);
});

// Socket io conexion
io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('listarplatos', aMsgPlatos);

    // Funcionalidad realtime Pedir nuevo plato (Mozo pide nuevo plato a cocina)
    socket.on('nuevoplato', function(oMsgPlato) {
        aMsgPlatos.push(oMsgPlato);
        io.sockets.emit('colaplatos', {
            platos: aMsgPlatos,
            lastPlato: oMsgPlato
        });
    });

    // Fucionalidad realtime servir un plato (concinero sirve plato)
    socket.on('servirplato', function(oPlatoState) {
        for (var i in aMsgPlatos) {
            if (aMsgPlatos[i].cod == oPlatoState.cod) {
                aMsgPlatos[i].estado = oPlatoState.estado;
                break;
            }
        }
    });
});

// estableciendo puerto de applicacion (aritficio para puerto dinamico de heroku)
const port = bIsLocal ? cnf.port : (process.env.PORT || 8080);

// lanzando server
server.listen(port, function() {
    console.log("Servidor corriendo en " + cnf.host + ":" + port);
    //console.log("process.env.NODE_ENV: "+process.env.NODE_ENV);
});
=======
// Declaraciones globales
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var env = (process.env.NODE_ENV || "local").toLowerCase();
var cnf = require('./config')[env];
var bIsLocal = (process.env.NODE_ENV == 'local');
var aMsgPlatos = [];

// estableciendo directorio de elementos estaticos
app.use(express.static('public'));

// Url para ver variable de entorno NODE_ENV
app.get('/node_env', function(req, res) {
    res.status(200).send("process.env.NODE_ENV: " + process.env.NODE_ENV);
});

// Limpiando cola de cocina
app.get('/cocina/limpiar-cola', function(req, res) {
    aMsgPlatos = [];
    res.status(200).send("Cola de platos: " + aMsgPlatos.length);
});

// Socket io conexion
io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('listarplatos', aMsgPlatos);

    // Funcionalidad realtime Pedir nuevo plato (Mozo pide nuevo plato a cocina)
    socket.on('nuevoplato', function(oMsgPlato) {
        aMsgPlatos.push(oMsgPlato);
        io.sockets.emit('colaplatos', {
            platos: aMsgPlatos,
            lastPlato: oMsgPlato
        });
    });

    // Fucionalidad realtime servir un plato (concinero sirve plato)
    socket.on('servirplato', function(oPlatoState) {
        for (var i in aMsgPlatos) {
            if (aMsgPlatos[i].cod == oPlatoState.cod) {
                aMsgPlatos[i].estado = oPlatoState.estado;
                break;
            }
        }
    });
});

// estableciendo puerto de applicacion (aritficio para puerto dinamico de heroku)
const port = bIsLocal ? cnf.port : (process.env.PORT || 8080);

// lanzando server
server.listen(port, function() {
    console.log("Servidor corriendo en " + cnf.host + ":" + port);
    //console.log("process.env.NODE_ENV: "+process.env.NODE_ENV);
});
>>>>>>> 1d67c52b477b83ee6bb377eee579944a96027142
