var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fs = require('fs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

	// oku

	fs.readFile('/metinler.txt', 'utf8', function(err, data) {

		io.emit('txtMesajlari', data);

	});

	// oku

  socket.on('chat message', function(msg, uniq){

  	// txt yaz

  	fs.appendFile("/metinler.txt", msg + '___<--->___', 'utf8', function(err) { /**/ });

  	// txt yaz

    io.emit('gelenMesajlar', msg, uniq);

  });
});

http.listen( process.env.PORT || 5000 , function(){
  console.log('listening on *:5000');
});