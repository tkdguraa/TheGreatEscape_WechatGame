var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var IngameBackground = /** @class */ (function (_super) {
    __extends(IngameBackground, _super);
    function IngameBackground() {
        var _this = _super.call(this) || this;
        _this.init();
        _this.stage.on(Laya.Event.KEY_DOWN, _this, _this.down);
        return _this;
    }
    IngameBackground.prototype.init = function () {
        this.bg = new Laya.Sprite();
        this.addChild(this.bg);
        this.bg.loadImage("res/stage.png");
        for (var i = 0; i < 8; i++) {
            var challenge = new tile();
            if (i % 2 === 0)
                challenge.makeblock('2', 15, 2, 45 * 2 + i * 90, 90 + 45 * 3);
            else
                challenge.makeblock('3', 15, 2, 45 * 2 + i * 90, 90 + 45 * 3);
            this.addChild(challenge);
        }
        var startline = new tile();
        startline.makeblock('1', 2, 9, 0, 90);
        this.addChild(startline);
        var finishline = new tile();
        finishline.makeblock('1', 1, 9, 755, 90);
        this.addChild(finishline);
        this.hero = new Hero();
        this.hero.loadImage("res/Hero.png");
        this.hero.pos(10, 300);
        this.addChild(this.hero);
    };
    IngameBackground.prototype.down = function (e) {
        console.log(e.keyCode);
        if (e.keyCode === 37)
            this.hero.x -= 10;
        if (e.keyCode === 38)
            this.hero.y -= 10;
        if (e.keyCode === 39)
            this.hero.x += 10;
        if (e.keyCode === 40)
            this.hero.y += 10;
    };
    return IngameBackground;
}(Laya.Sprite));
//# sourceMappingURL=IngameBackGround.js.map