let canvas, ctx;

let ball = { xPos: 0, yPos: 0, radius: 15, speedX: 5, speedY: 5 };

let player1 = {
    yPos: 0, height: 150, name: "right",
    clearField: function () {
        ctx.clearRect(0, 0, 20, canvas.height);
    },
    draw: function (param) {
        ctx.fillRect(5, param, 15, player1.height);
    }
};

let player2 = {
    yPos: 0, height: 150, name: "left",
    clearField: function () {
        ctx.clearRect(canvas.width - 20, 0, canvas.width, canvas.height);
    },
    draw: function (param) {
        ctx.fillRect(canvas.width - 20, param, 15, player1.height);
    }
};

let myRole = null;
let roleNumer = 0;
document.addEventListener("DOMContentLoaded", () => {
    var socket = io();

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    player1.yPos = canvas.height / 2 - player1.height / 2;
    player2.yPos = canvas.height / 2 - player2.height / 2;
    ball.xPos = canvas.width / 2;
    ball.yPos = canvas.height / 2;
    ctx.fillRect(5, canvas.height / 2 - player1.height / 2, 15, player1.height); //player1
    ctx.fillRect(canvas.width - 20, canvas.height / 2 - player2.height / 2, 15, player2.height); //player2
    canvas.addEventListener('mousemove', function (event) {
        if(myRole){
            let y = event.clientY - canvas.getBoundingClientRect().top;
            socket.emit('move', {player: roleNumer, y: y});
        }
    }, false);
    socket.on('firstLoad', (data) => {
        if(data.role == 1) myRole = player1;
        else if(data.role == 2) myRole = player2;
        roleNumer = data.role;
    });
    socket.on('serverMove', (data) => {
        let role;
        if(data.role == 1) role = player1;
        else if(data.role == 2) role = player2;
        role.clearField();
        role.draw(data.param);
        role.yPos = data.param;
    });
});

function drawPlayer(player, y) {
    let secondParam;
    player.clearField();
    secondParam = y - player.height / 2;
    if (y - player.height / 2 < 0) secondParam = 0;
    else if (y + player.height / 2 > canvas.height) secondParam = canvas.height - player.height;
    player.draw(secondParam);
    player.yPos = secondParam;
}