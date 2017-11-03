// local url socket http://192.168.10.17:8686
var socket = io.connect('https://socket-menu.herokuapp.com', { 'forceNew': true });

socket.on('messages', function(data) {
  console.log(data);
  render(data);
})

// Mostrando mesajes de comunicacion
function render (data) {
  var html = data.map(function(elem, index) {
    return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

// Adicionando nuevo mensaje
function addMessage(e) {
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  return false;
}
