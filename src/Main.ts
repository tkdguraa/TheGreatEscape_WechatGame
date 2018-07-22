class Game{
    private bg:StartBackGround;
    private bg2:IngameBackground;
    constructor()
     {
       Laya.init(800,600,Laya.WebGL);
       this.bg = new StartBackGround();
       Laya.stage.addChild(this.bg);
       this.bg.Play.on(Laya.Event.CLICK,this,this.clickHandler);
    }
    clickHandler():void{
       console.log('on click');
       this.bg.removeSelf();
       this.bg2 = new IngameBackground;
       Laya.stage.addChild(this.bg2);
    }
}

new Game();