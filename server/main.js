var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var env = (process.env.NODE_ENV || "local").toLowerCase();
var cnf = require('./config')[env];
var bIsLocal = (process.env.NODE_ENV=='local');
var messages = [{id: 1, text: "primer mensaje", author: "JRodriguez"}];

app.use(express.static('public'));

app.get('/node_env', function(req, res) {
  res.status(200).send("process.env.NODE_ENV: "+process.env.NODE_ENV);
});

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages', messages);

  socket.on('new-message', function(data) {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
});

const port = bIsLocal ? cnf.port : (process.env.PORT || 8080);

server.listen(port, function() {
  console.log("Servidor corriendo en " + cnf.host + ":"+port);
  //console.log("process.env.NODE_ENV: "+process.env.NODE_ENV);
});