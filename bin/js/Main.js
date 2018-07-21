var Game = /** @class */ (function () {
    function Game() {
        Laya.init(800, 600, Laya.WebGL);
        var bg = new StartBackGround();
        Laya.stage.addChild(bg);
    }
    return Game;
}());
new Game();
//# sourceMappingURL=Main.js.map