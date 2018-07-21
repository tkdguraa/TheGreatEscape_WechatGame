class Game{
    constructor()
     {
       Laya.init(800,600,Laya.WebGL);
       let bg:StartBackGround = new StartBackGround();
       Laya.stage.addChild(bg);
    }
}

new Game();