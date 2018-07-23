import WebGL = Laya.WebGL;
    class Game{
    private bg:StartBackGround;
    private bg2:IngameBackground;
    constructor()
     {

       Laya.init(800,600,WebGL);

       // 初始屏幕适配
       Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
       Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
       Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
       Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;


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