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
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Hero.prototype.init = function () {
        this.body = new Laya.Animation();
        this.burn = new Laya.Animation();
        this.right = new Laya.Animation();
        this.left = new Laya.Animation();
        this.up = new Laya.Animation();
        this.down = new Laya.Animation();
        this.stand = new Laya.Animation();
        this.speedX = 0;
        this.speedY = 0;
        this.body.loadAtlas("res2/atlas/res.atlas", Laya.Handler.create(this, this.onLoaded));
        this.burn.loadAtlas("res2/atlas/burn.atlas", Laya.Handler.create(this, this.onLoaded2));
        this.right.loadAtlas("res2/atlas/goright.atlas", Laya.Handler.create(this, this.onLoaded3));
        this.left.loadAtlas("res2/atlas/goleft.atlas", Laya.Handler.create(this, this.onLoaded4));
        this.up.loadAtlas("res2/atlas/goup.atlas", Laya.Handler.create(this, this.onLoaded5));
        this.down.loadAtlas("res2/atlas/godown.atlas", Laya.Handler.create(this, this.onLoaded6));
        this.stand.loadAtlas("res2/atlas/normal.atlas", Laya.Handler.create(this, this.onLoaded7));
        this.right.play();
        this.left.play();
        this.up.play();
        this.down.play();
        this.stand.play();
        this.body.visible = false;
        this.burn.visible = false;
        this.right.visible = false;
        this.left.visible = false;
        this.up.visible = false;
        this.down.visible = false;
        this.stand.visible = false;
        this.body.interval = 200;
        this.burn.interval = 200;
        this.right.interval = 200;
        this.left.interval = 200;
        this.up.interval = 200;
        this.down.interval = 200;
        this.stand.interval = 200;
        this.burn.interval = 200;
        this.alive = 1;
    };
    Hero.prototype.onLoaded = function () {
        this.addChild(this.body);
    };
    Hero.prototype.onLoaded2 = function () {
        this.addChild(this.burn);
    };
    Hero.prototype.onLoaded3 = function () {
        this.addChild(this.right);
    };
    Hero.prototype.onLoaded4 = function () {
        this.addChild(this.left);
    };
    Hero.prototype.onLoaded5 = function () {
        this.addChild(this.up);
    };
    Hero.prototype.onLoaded6 = function () {
        this.addChild(this.down);
    };
    Hero.prototype.onLoaded7 = function () {
        this.addChild(this.stand);
    };
    return Hero;
}(Laya.Sprite));
//# sourceMappingURL=Hero.js.map