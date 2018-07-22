var Game = /** @class */ (function () {
    function Game() {
        Laya.init(800, 600, Laya.WebGL);
        this.bg = new StartBackGround();
        Laya.stage.addChild(this.bg);
        this.bg.Play.on(Laya.Event.CLICK, this, this.clickHandler);
    }
    Game.prototype.clickHandler = function () {
        console.log('on click');
        this.bg.removeSelf();
        this.bg2 = new IngameBackground;
        Laya.stage.addChild(this.bg2);
    };
    return Game;
}());
new Game();
//# sourceMappingURL=Main.js.map