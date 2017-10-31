var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var env = (process.env.NODE_ENV || "local").toLowerCase();
var cnf = require('./config')[env];
var bIsLocal = (process.env.NODE_ENV=='local');
var aMsgPlatos = [];

app.use(express.static('public'));

app.get('/node_env', function(req, res) {
  res.status(200).send("process.env.NODE_ENV: "+process.env.NODE_ENV);
});

app.get('/cocina/limpiar-cola', function(req, res) {
  aMsgPlatos = [];
  res.status(200).send("Cola de platos: "+aMsgPlatos.length);
});

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('listarplatos', aMsgPlatos);

  socket.on('nuevoplato', function(oMsgPlato) {
    aMsgPlatos.push(oMsgPlato);
    io.sockets.emit('colaplatos', {platos:aMsgPlatos, lastPlato:oMsgPlato});
  });
  
  socket.on('servirplato', function(oPlatoState) {
	for(var i in aMsgPlatos){ 
		if(aMsgPlatos[i].cod == oPlatoState.cod){
			aMsgPlatos[i].estado = oPlatoState.estado;
			break;
		}
	}
  });
});

const port = bIsLocal ? cnf.port : (process.env.PORT || 8080);

server.listen(port, function() {
  console.log("Servidor corriendo en " + cnf.host + ":"+port);
  //console.log("process.env.NODE_ENV: "+process.env.NODE_ENV);
});