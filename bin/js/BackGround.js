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
var thunderMode1 = /** @class */ (function (_super) {
    __extends(thunderMode1, _super);
    function thunderMode1() {
        var _this = _super.call(this) || this;
        _this.init();
        _this.stage.on(Laya.Event.KEY_DOWN, _this, _this.down);
        _this.frameLoop(1, _this, _this.Loop);
        return _this;
    }
    thunderMode1.prototype.init = function () {
        this.bg = new Laya.Sprite();
        this.stage.addChild(this.bg);
        this.bg.loadImage("res/stage.png");
        var challenge = new tile();
        challenge.makeblock('2', 15, 9, 45, 90);
        this.stage.addChild(challenge);
        var startline = new tile();
        startline.makeblock('1', 2, 9, 0, 90);
        this.stage.addChild(startline);
        var finishline = new tile();
        finishline.makeblock('1', 2, 9, 720, 90);
        this.stage.addChild(finishline);
        this.hero = new Hero();
        this.hero.init();
        this.hero.pos(0, 300);
        this.stage.addChild(this.hero);
        this.createTrap(20, 3);
    };
    thunderMode1.prototype.Loop = function () {
        for (var i = this.numChildren - 1; i >= 0; i--) {
            var trap = this.getChildAt(i);
            var temp = Math.random();
            if (temp > 0.7 && trap.x + 5 < 660)
                trap.x += trap.speed;
            else if (temp < 0.7 && temp > 0.4 && trap.x - 5 > 90)
                trap.x -= trap.speed;
            var temp2 = Math.random();
            if (temp2 > 0.7 && trap.y + 55 < 600)
                trap.y += trap.speed;
            else if (temp2 < 0.7 && temp2 > 0.4 && trap.y - 5 > 0)
                trap.y -= trap.speed;
            //遍历每一个闪电,使它们按一定概率移动
            if (Math.abs(this.hero.x - trap.x) < 13 && Math.abs(this.hero.y - trap.y) < 30 && this.hero.alive === 1) { //判断碰撞
                console.log("failed!");
                this.hero.body.removeSelf();
                this.hero.burn.play(0, false);
                this.hero.alive = 0;
            }
        }
    }; //width:20~30,height:5~45 trap    
    //width:5~35,height:5~45 hero
    thunderMode1.prototype.createTrap = function (num, speed) {
        for (var i = 0; i < num; i++) {
            var trap = Laya.Pool.getItemByClass("thunder", thunder);
            trap.init(speed);
            trap.pos(Math.random() * 600 + 90, Math.random() * 600);
            this.addChild(trap);
        }
    };
    thunderMode1.prototype.down = function (e) {
        if (this.hero.alive === 1) {
            if (e.keyCode === 37)
                this.hero.x -= 5;
            if (e.keyCode === 38)
                this.hero.y -= 5;
            if (e.keyCode === 39)
                this.hero.x += 5;
            if (e.keyCode === 40)
                this.hero.y += 5;
        }
        var cnt = 0;
        for (var i = 1; i <= this.stage.numChildren - 3; i++) {
            var m_tile = this.stage.getChildAt(i);
            if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 &&
                this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height)) {
                break;
            }
            cnt++;
        }
        if (cnt === this.stage.numChildren - 3 && this.hero.alive === 1) {
            console.log("die!");
            this.hero.alive = 0;
            this.hero.burn.removeSelf();
            this.hero.body.play(0, false);
            if (e.keyCode === 37)
                this.hero.x -= 20;
            if (e.keyCode === 38)
                this.hero.y -= 20;
            if (e.keyCode === 39)
                this.hero.x += 20;
            if (e.keyCode === 40)
                this.hero.y += 20;
        }
    };
    return thunderMode1;
}(Laya.Sprite));
var BoomMode1 = /** @class */ (function (_super) {
    __extends(BoomMode1, _super);
    function BoomMode1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BoomMode1;
}(Laya.Sprite));
//# sourceMappingURL=BackGround.js.map