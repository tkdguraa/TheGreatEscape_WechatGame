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
var StartBackGround = /** @class */ (function (_super) {
    __extends(StartBackGround, _super);
    function StartBackGround() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    StartBackGround.prototype.init = function () {
        //创造两个背景并连接，轮流播放
        this.bgFirst = new Laya.Sprite();
        this.bgFirst.loadImage("res/background.jpg");
        this.addChild(this.bgFirst);
        this.bgSecond = new Laya.Sprite();
        this.bgSecond.loadImage("res/background.jpg");
        this.bgSecond.pos(-800, 0);
        this.addChild(this.bgSecond);
        this.Play = new Laya.Button();
        this.Play.x = 272;
        this.Play.y = 350;
        this.Play.width = 250;
        this.Play.height = 100;
        this.Play.loadImage("res/Play.png");
        this.addChild(this.Play);
        // this.on(Laya.Event.CLICK,this,this.clickHandler);
        this.DisplayTitle();
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    StartBackGround.prototype.onLoop = function () {
        this.bgFirst.x = this.bgFirst.x + 1;
        this.bgSecond.x = this.bgSecond.x + 1;
        if (this.bgFirst.x + this.x >= 800) {
            this.bgFirst.x = this.bgFirst.x - 800 * 2;
        }
        if (this.bgSecond.x + this.x >= 800) {
            this.bgSecond.x = this.bgSecond.x - 800 * 2;
        }
    };
    StartBackGround.prototype.DisplayTitle = function () {
        //字符串总宽度
        var w = 500;
        var w2 = 300;
        //文本创建时的起始x位置
        var offsetX = Laya.stage.width - w >> 1;
        var offsetX2 = Laya.stage.width - w2 >> 1;
        var title1 = "The GReat";
        var title2 = "Escape";
        var letterText;
        //根据字符串长度创建单个字符，并对每个单独字符使用缓动动画
        for (var i = 0, len = title1.length; i < len; ++i) {
            letterText = this.createLetter(title1.charAt(i));
            letterText.x = w / len * i + offsetX;
            letterText.y = 0;
            /**
                * 对象letterText属性y从100缓动到300的位置，每一帧都通过回调方法更新颜色
                * 用1000毫秒完成缓动效果
                * 缓动类型采用bounceIn
                * 单个字符的缓动效果结束后，使用changeColor回调函数将字符改变为红色
                * 延迟间隔i*100毫秒执行
                */
            Laya.Tween.to(letterText, { y: 100, update: new Laya.Handler(this, this.updateColor, [letterText]) }, 1000, Laya.Ease.bounceIn, Laya.Handler.create(this, this.changeColor, [letterText]), 100);
        }
        for (var i = 0, len = title2.length; i < len; ++i) {
            letterText = this.createLetter(title2.charAt(i));
            letterText.x = w2 / len * i + offsetX2;
            letterText.y = 0;
            Laya.Tween.to(letterText, { y: 200, update: new Laya.Handler(this, this.updateColor, [letterText]) }, 1000, Laya.Ease.bounceIn, Laya.Handler.create(this, this.changeColor, [letterText]), 100);
        }
    };
    StartBackGround.prototype.updateColor = function (txt) {
        var c = Math.floor(Math.random() * 3);
        switch (c) {
            case 0:
                txt.color = "#912299";
                break;
            case 1:
                txt.color = "#ffffff";
                break;
            case 2:
                txt.color = "#8080ff";
                break;
            default:
                txt.color = "#eee000";
                break;
        }
    };
    StartBackGround.prototype.changeColor = function (txt) {
        txt.color = "#f9e3f3";
    };
    StartBackGround.prototype.createLetter = function (char) {
        var letter = new Laya.Text();
        letter.text = char;
        letter.color = "#ffffff";
        letter.font = "Impact";
        letter.fontSize = 100;
        this.addChild(letter);
        return letter;
    };
    return StartBackGround;
}(Laya.Sprite));
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
        this.rocker = new Laya.Sprite();
        this.rocker.loadImage("res/control-rocker.png");
        this.rocker.pos(20, 240);
        this.addChild(this.rocker);
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
//# sourceMappingURL=BackGround.js.map