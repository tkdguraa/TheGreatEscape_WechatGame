var Game = /** @class */ (function () {
    function Game() {
        Laya.init(800, 600, Laya.WebGL);
        var StartButton = Laya.Button;
        var Play = new StartButton();
        Play.x = 272;
        Play.y = 350;
        Play.width = 250;
        Play.height = 100;
        Play.loadImage("res/Play.png");
        var bg = new StartBackGround();
        Laya.stage.addChild(bg);
        Laya.stage.addChild(Play);
        bg.DisplayTitle();
        Play.on(Laya.Event.CLICK, this, this.clickHandler);
    }
    Game.prototype.clickHandler = function (e) {
        console.log('on click');
    };
    return Game;
}());
new Game();
//# sourceMappingURL=Main.js.map