class Game{
    constructor()
     {
       Laya.init(800,600,Laya.WebGL);
       let StartButton = Laya.Button;
       let Play = new StartButton();
       Play.x = 272;
       Play.y = 350;
       Play.width = 250;
       Play.height = 100;
       Play.loadImage("res/Play.png")
       let bg:StartBackGround = new StartBackGround();
       Laya.stage.addChild(bg);
       Laya.stage.addChild(Play);
       bg.DisplayTitle();
       Play.on(Laya.Event.CLICK,this,this.clickHandler);
    }
     clickHandler():void{
           console.log('on click');
       }
}

new Game();