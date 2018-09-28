var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const Game = require('./classes/Game');

app.use(express.static('public'));

app.set('views', __dirname + '/public/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function (req, res) {
    res.render('index.html');
});

let player1 = null;
let player2 = null;
let queue = [];
let Clients = [];
let currentGame = null;
io.on('connection', function (socket) {
    socket.id = Math.random().toString(20).substring(2,30);
    Clients[socket.id] = socket;
    if(!player1){
        player1 = socket;
        socket.emit('firstLoad', { role: 1 });
    } 
    else if(!player2){
        player2 = socket;
        currentGame = new Game(player1, player2);
        socket.emit('firstLoad', { role: 2 });
        // currentGame.start();
    }
    else{
        queue.push(socket);
        socket.emit('firstLoad', { role: 0 });
    }
    socket.on('disconnect', function(socket){
        console.log("disconnect");
    });

    socket.on('move', (data) => {
        if(currentGame){
        let result = currentGame.move(data.player, data.y);
        io.emit('serverMove', {role: result.role, param: result.param});
        }
    });

});

http.listen(3000, function () {
    console.log('listening on 3000');
});