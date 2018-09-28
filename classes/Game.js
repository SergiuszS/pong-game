module.exports = class Game{

    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.canvas = {};
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.player1 = {yPos: this.canvas.height-75, height: 150, name: "right"};
        this.player2 = {yPos: this.canvas.height-75, height: 150, name: "left"};

        this.ball = { xPos: this.canvas.width/2, yPos: this.canvas.height/2, radius: 15, speedX: 5, speedY: 5 };
    }
    move(role, y){
        let player;
        if(role == 1) player = this.player1;
        else if(role == 2) player = this.player2;
        let secondParam = y - player.height / 2;
        if (y - player.height / 2 < 0) secondParam = 0;
        else if (y + player.height / 2 > this.canvas.height) secondParam = this.canvas.height - player.height;
        player.yPos = secondParam;
        return {role: role, param: secondParam};
    }
}