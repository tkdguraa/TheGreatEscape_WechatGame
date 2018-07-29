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
var revival = 1;
var mapnum = 0;
var username;
var InputName = /** @class */ (function (_super) {
    __extends(InputName, _super);
    function InputName() {
        var _this = _super.call(this) || this;
        _this.bg = new Laya.Sprite();
        _this.okbutton = new Laya.Button();
        _this.title = new Laya.Text();
        _this.yourname = new Laya.TextInput();
        _this.title.text = "               You made it! \n Please tell us your name:";
        _this.title.color = "#ffffff";
        _this.title.font = "Impact";
        _this.title.fontSize = 50;
        _this.title.pos(100, 0);
        _this.yourname.wordWrap = true;
        _this.yourname.fontSize = 30;
        _this.yourname.pos(250, 230);
        _this.yourname.width = 250;
        _this.yourname.height = 50;
        _this.yourname.bgColor = "#c30c30";
        //游戏完全通关之后 输入名字的输入栏信息。
        _this.bg.loadImage("res2/scoreboard.png");
        _this.okbutton.loadImage("res2/ok.png");
        _this.okbutton.pos(520, 230);
        _this.okbutton.on(Laya.Event.CLICK, _this, _this.backtostart);
        _this.addChild(_this.bg);
        _this.addChild(_this.yourname);
        _this.addChild(_this.title);
        _this.addChild(_this.okbutton);
        return _this;
    }
    InputName.prototype.backtostart = function () {
        for (var i = 0; i < this.numChildren; i++) {
            var m_child = this.getChildAt(i);
            m_child.removeSelf();
        }
        var bg = new Game();
        username = this.yourname.text;
        game.sendRanking(username, revival);
        game.hero.alive = 1;
        Laya.stage.addChild(bg);
    };
    return InputName;
}(Laya.Sprite)); //完全通关游戏之后输入玩家昵称的界面
var StartBackGround = /** @class */ (function (_super) {
    __extends(StartBackGround, _super);
    function StartBackGround() {
        var _this = _super.call(this) || this;
        Laya.SoundManager.playMusic("res/sound/bgm.mp3", 0);
        _this.init();
        return _this;
    }
    StartBackGround.prototype.init = function () {
        //创造两个背景并连接，轮流播放
        this.bgFirst = new Laya.Sprite();
        this.bgFirst.loadImage("res2/background.jpg"); //为了实现背景移动效果，夹在两个图片
        this.addChild(this.bgFirst);
        this.bgSecond = new Laya.Sprite();
        this.bgSecond.loadImage("res2/background.jpg");
        this.bgSecond.pos(-800, 0);
        this.addChild(this.bgSecond);
        this.Help = new Laya.Button(); //进入说明界面的按钮
        this.Help.x = 730;
        this.Help.y = 0;
        this.Help.width = 70;
        this.Help.height = 70;
        this.Help.loadImage("res2/Help.png");
        this.addChild(this.Help);
        this.Rank = new Laya.Button(); //进入积分榜界面的按钮
        this.Rank.x = 0;
        this.Rank.y = 0;
        this.Rank.width = 90;
        this.Rank.height = 45;
        this.Rank.loadImage("res2/rank.png");
        this.addChild(this.Rank);
        this.Play = new Laya.Button(); //计入游戏界面的按钮
        this.Play.x = 272;
        this.Play.y = 350;
        this.Play.width = 250;
        this.Play.height = 100;
        this.Play.loadImage("res2/Play.png");
        this.addChild(this.Play);
        this.DisplayTitle();
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    StartBackGround.prototype.onLoop = function () {
        this.bgFirst.x = this.bgFirst.x + 1;
        this.bgSecond.x = this.bgSecond.x + 1;
        if (this.bgFirst.x + this.x >= 800) //连接两个图片并移动，如果出屏幕则回到原来的地点
            this.bgFirst.x = this.bgFirst.x - 800 * 2;
        if (this.bgSecond.x + this.x >= 800)
            this.bgSecond.x = this.bgSecond.x - 800 * 2;
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
        for (var i = 0, len = title1.length; i < len; ++i) {
            letterText = this.createLetter(title1.charAt(i));
            letterText.x = w / len * i + offsetX;
            letterText.y = 0;
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
}(Laya.Sprite)); //游戏的开始界面
var Scoreboard = /** @class */ (function (_super) {
    __extends(Scoreboard, _super);
    function Scoreboard() {
        var _this = _super.call(this) || this;
        _this.Rank1 = new Laya.Text();
        _this.Rank2 = new Laya.Text();
        _this.Rank3 = new Laya.Text();
        _this.Rank4 = new Laya.Text();
        _this.Rank5 = new Laya.Text();
        _this.MyRank = new Laya.Text();
        _this.Rank1.color = "#ffffff";
        _this.Rank1.font = "Impact";
        _this.Rank1.fontSize = 50;
        _this.Rank1.pos(150, 100);
        _this.Rank2.color = "#ffffff";
        _this.Rank2.font = "Impact";
        _this.Rank2.fontSize = 50;
        _this.Rank2.pos(150, 200);
        _this.Rank3.color = "#ffffff";
        _this.Rank3.font = "Impact";
        _this.Rank3.fontSize = 50;
        _this.Rank3.pos(150, 300);
        _this.Rank4.color = "#ffffff";
        _this.Rank4.font = "Impact";
        _this.Rank4.fontSize = 50;
        _this.Rank4.pos(150, 400);
        _this.Rank5.color = "#ffffff";
        _this.Rank5.font = "Impact";
        _this.Rank5.fontSize = 50;
        _this.Rank5.pos(150, 500);
        _this.MyRank.color = "#ffffff";
        _this.MyRank.font = "Impact";
        _this.MyRank.fontSize = 50;
        _this.MyRank.pos(500, 100);
        _this.Ranking = new Laya.Sprite();
        _this.Ranking.x = 200;
        _this.Ranking.y = 0;
        _this.Ranking.loadImage("res2/Ranking.png");
        _this.Back = new Laya.Button();
        _this.bg = new Laya.Sprite();
        _this.bg.loadImage("res2/scoreboard.png");
        _this.Back = new Laya.Button();
        _this.Back.x = 10;
        _this.Back.y = 510;
        _this.Back.width = 90;
        _this.Back.height = 45;
        _this.Back.loadImage("res2/back.png");
        _this.addChild(_this.bg);
        _this.addChild(_this.Back);
        _this.addChild(_this.Rank1);
        _this.addChild(_this.Rank2);
        _this.addChild(_this.Rank3);
        _this.addChild(_this.Rank4);
        _this.addChild(_this.Rank5);
        _this.addChild(_this.MyRank);
        _this.addChild(_this.Ranking);
        _this.Back.on(Laya.Event.CLICK, _this, _this.backtoStart);
        return _this;
    }
    Scoreboard.prototype.backtoStart = function () {
        this.bg.removeSelf();
        this.Back.removeSelf();
        Laya.stage.addChild(game.bg);
    };
    return Scoreboard;
}(Laya.Sprite));
var Instruction = /** @class */ (function (_super) {
    __extends(Instruction, _super);
    function Instruction() {
        var _this = _super.call(this) || this;
        _this.Back = new Laya.Button();
        _this.bg = new Laya.Sprite();
        _this.bg.loadImage("res2/instruction.png");
        _this.Back = new Laya.Button();
        _this.Back.x = 10;
        _this.Back.y = 510;
        _this.Back.width = 90;
        _this.Back.height = 45;
        _this.Back.loadImage("res2/back.png");
        _this.addChild(_this.bg);
        _this.addChild(_this.Back);
        _this.Back.on(Laya.Event.CLICK, _this, _this.backtoStart);
        return _this;
    }
    Instruction.prototype.backtoStart = function () {
        this.bg.removeSelf();
        this.Back.removeSelf();
        Laya.stage.addChild(game.bg);
    };
    return Instruction;
}(Laya.Sprite));
var ThunderMode1 = /** @class */ (function (_super) {
    __extends(ThunderMode1, _super);
    function ThunderMode1() {
        var _this = _super.call(this) || this;
        _this.init();
        _this.rebutton = new Laya.Button();
        _this.thu = new Thunder();
        _this.frameLoop(1, _this, _this.Loop);
        _this.frameLoop(1, _this, _this.judstate);
        DisplayRevival();
        return _this;
    }
    ThunderMode1.prototype.setmap = function () {
        this.challenge = this.Tmap1.challenge;
        this.startline = this.Tmap1.startline;
        this.finishline = this.Tmap1.finishline;
        this.stage.addChild(this.challenge);
        this.stage.addChild(this.startline);
        this.stage.addChild(this.finishline);
        this.hero = game.hero;
        this.hero.pos(0, 300);
        this.stage.addChild(this.hero);
        this.stage.addChild(game.hero);
        this.stage.addChild(game.ctrl_rocker);
        this.stage.addChild(game.ctrl_rocker_move);
        this.stage.addChild(game.ctrl_back);
        this.createTrap(20, 3);
        this.stage.addChild(this.thu);
    };
    ThunderMode1.prototype.regame = function () {
        if (this.hero.alive === 0) {
            revival++;
            for (var i = 0; i < this.stage.numChildren; i++) {
                var m_child = this.stage.getChildAt(i);
                m_child.removeSelf();
            }
            for (var i = 0; i < this.numChildren; i++) {
                var m_child = this.getChildAt(i);
                m_child.removeSelf();
            }
            Laya.SoundManager.playMusic("res/sound/bgm.mp3", 0);
            var bg = new ThunderMode1();
            bg.setmap();
            this.hero.speedX = 0;
            this.hero.speedY = 0;
            this.hero.alive = 1;
            this.hero.burn.visible = false;
            this.hero.body.visible = false;
            Laya.stage.addChild(bg);
        }
    };
    ThunderMode1.prototype.judstate = function () {
        var m_tile = this.finishline;
        if (this.hero.alive === 1) {
            if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height)) {
                for (var i = 0; i < this.stage.numChildren; i++) {
                    var m_child = this.stage.getChildAt(i);
                    m_child.removeSelf();
                }
                for (var i = 0; i < this.numChildren; i++) {
                    var m_child = this.getChildAt(i);
                    m_child.removeSelf();
                }
                var bg = new BombMode1();
                mapnum++;
                bg.setmap(mapnum);
                bg.coursenum = mapnum;
                console.log(mapnum);
                this.hero.speedX = 0;
                this.hero.speedY = 0;
                this.timer.clear(this, this.judstate);
                this.timer.clear(this, this.Loop);
                Laya.stage.addChild(bg);
            }
        } //若角色到达终点，则删除所有节点与循环，移动到下一个地图
        var cnt = 0;
        for (var i = 1; i < this.stage.numChildren - 2; i++) {
            var m_tile_1 = this.stage.getChildAt(i);
            if (i === 1) {
                for (var j = 0; j < this.challenge.numChildren; j++) {
                    var _tile = this.challenge.getChildAt(j);
                    if ((this.hero.x + 20 >= _tile.posX && this.hero.x + 20 <= _tile.posX + _tile.width * 45 && this.hero.y + 23 >= _tile.posY && this.hero.y + 23 <= _tile.posY + 45 * _tile.height))
                        break;
                    cnt++;
                }
            }
            else {
                if ((this.hero.x + 20 >= m_tile_1.posX && this.hero.x + 20 <= m_tile_1.posX + m_tile_1.width * 45 &&
                    this.hero.y + 23 >= m_tile_1.posY && this.hero.y + 23 <= m_tile_1.posY + 45 * m_tile_1.height))
                    break;
                cnt++;
            }
        }
        if (cnt === this.stage.numChildren + this.challenge.numChildren - 4 && this.hero.alive === 1) {
            Laya.SoundManager.playMusic("res/sound/fall.wav", 1);
            DisplayWords(0);
            this.hero.alive = 0;
            makeunvisible(this.hero);
            this.hero.body.visible = true;
            this.hero.body.play(0, false);
            if (this.hero.speedX < 0)
                this.hero.x -= 20;
            if (this.hero.speedY < 0)
                this.hero.y -= 20;
            if (this.hero.speedX > 0)
                this.hero.x += 20;
            if (this.hero.speedY > 0)
                this.hero.y += 20;
        }
        if (this.hero.alive === 0) {
            this.rebutton.pos(400, 400);
            this.rebutton.width = 45;
            this.rebutton.height = 45;
            this.rebutton.loadImage("res2/regame.png");
            this.rebutton.on(Laya.Event.CLICK, this, this.regame);
            Laya.stage.addChild(this.rebutton);
        }
        if (this.hero.alive === 0) {
            this.timer.clear(this, this.judstate);
            this.timer.clear(this, this.Loop);
            mapnum = 0;
            for (var i = this.thu.numChildren - 1; i >= 0; i--) {
                var trap = this.thu.getChildAt(i);
                trap.removeSelf();
            } //给予每一个闪电速度
        }
    }; //遍历每块瓷砖，知道找到英雄所处的瓷砖为止若遍历了所有瓷砖，则说明英雄不再瓷砖上，判掉落
    ThunderMode1.prototype.Loop = function () {
        for (var i = this.thu.numChildren - 1; i >= 0; i--) {
            var trap = this.thu.getChildAt(i);
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
            judelectricshock(this.hero, trap);
        } //给予每一个闪电速度
    };
    ThunderMode1.prototype.init = function () {
        this.bg = new Laya.Sprite();
        this.hero = game.hero;
        this.stage.addChild(this.bg);
        this.bg.loadImage("res2/stage.png");
        this.startline = new Tile();
        this.challenge = new Tile();
        this.finishline = new Tile();
        this.Tmap1 = new Map();
        this.Tmap1.startline.makeblock('5', 1, 9, 0, 90);
        this.Tmap1.finishline.makeblock('1', 2, 9, 720, 90);
        this.Tmap1.challenge.makeblock('2', 15, 9, 45, 90);
    };
    ThunderMode1.prototype.createTrap = function (num, speed) {
        for (var i = 0; i < num; i++) {
            var trap = Laya.Pool.getItemByClass("thunder", Thunder);
            trap.init(speed);
            trap.pos(Math.random() * 600 + 90, Math.random() * 500 + 50);
            this.thu.addChild(trap);
        }
    };
    return ThunderMode1;
}(Laya.Sprite));
var BombMode1 = /** @class */ (function (_super) {
    __extends(BombMode1, _super);
    function BombMode1() {
        var _this = _super.call(this) || this;
        _this.init();
        _this.frameLoop(5, _this, _this.normal);
        _this.timer.frameLoop(1, _this, _this.course);
        _this.timer.frameLoop(1, _this, _this.judstate);
        _this.rebutton = new Laya.Button();
        DisplayRevival();
        return _this;
    }
    BombMode1.prototype.init = function () {
        this.bg = new Laya.Sprite();
        this.stage.addChild(this.bg);
        this.bg.loadImage("res2/stage2.png");
        this.startcnt = 0;
        this.Bmap1 = new Map();
        //制作地图
        for (var i = 0; i < 8; i++) {
            if (i % 2 === 0)
                this.Bmap1.challenge.makeblock('2', 2, 2, 90 + i * 90, 90 + 90);
            else
                this.Bmap1.challenge.makeblock('3', 2, 2, 90 + i * 90, 90 + 90);
        }
        this.Bmap1.startline.makeblock('5', 2, 9, 0, 90);
        this.Bmap1.finishline.makeblock('1', 2, 9, 720, 90);
        this.Bmap2 = new Map();
        for (var i = 0; i < 5; i++) {
            if (i % 2 === 0)
                this.Bmap2.challenge.makeblock('2', 3, 4, 90 + i * 135, 90 + 45 * 3);
            else
                this.Bmap2.challenge.makeblock('3', 3, 4, 90 + i * 135, 90 + 45 * 3);
        }
        this.Bmap2.challenge.makeblock('5', 2, 1, 45 * 3, 180);
        this.Bmap2.challenge.makeblock('5', 2, 1, 45 * 6, 180);
        this.Bmap2.challenge.makeblock('5', 2, 1, 45 * 9, 180);
        this.Bmap2.challenge.makeblock('5', 2, 1, 45 * 12, 180);
        this.Bmap2.startline.makeblock('5', 2, 9, 0, 90);
        this.Bmap2.finishline.makeblock('1', 1, 9, 765, 90);
        this.Bmap3 = new Map();
        for (var i = 0; i < 6; i++)
            this.Bmap3.challenge.makeblock('2', 1, 5, 90 + i * 45, 90 + 90);
        this.Bmap3.challenge.makeblock('3', 2, 3, 90 + 6 * 45, 90 + 135);
        for (var i = 0; i < 6; i++)
            this.Bmap3.challenge.makeblock('2', 1, 5, 90 + 8 * 45 + i * 45, 90 + 90);
        this.Bmap3.startline.makeblock('5', 2, 9, 0, 90);
        this.Bmap3.finishline.makeblock('1', 2, 9, 720, 90);
        this.Bmap4 = new Map();
        for (var i = 0; i < 6; i++)
            if (i % 2 === 0)
                this.Bmap4.challenge.makeblock('2', 2, 2, 90 + i * 90, 90 + 45 * 4);
            else
                this.Bmap4.challenge.makeblock('3', 2, 2, 90 + i * 90, 90 + 45 * 4);
        this.Bmap4.startline.makeblock('5', 2, 9, 0, 90);
        this.Bmap4.finishline.makeblock('1', 2, 9, 630, 90);
        this.Bmap5 = new Map();
        this.Bmap5.challenge.makeblock('2', 13, 2, 90, 90 + 45 * 3);
        this.Bmap5.challenge.makeblock('3', 13, 2, 90, 90 + 45 * 5);
        this.Bmap5.startline.makeblock('5', 2, 9, 0, 90);
        this.Bmap5.finishline.makeblock('1', 2, 9, 675, 90);
        this.Bmap6 = new Map();
        for (var i = 0; i < 3; i++)
            this.Bmap6.challenge.makeblock('2', 2, 2, 90 + 90 * i, 90);
        for (var i = 0; i < 3; i++)
            this.Bmap6.challenge.makeblock('3', 2, 2, 270 + 90 * i, 90 + 90);
        for (var i = 0; i < 3; i++)
            this.Bmap6.challenge.makeblock('2', 2, 2, 450 + 90 * i, 90 + 90 * 2);
        this.Bmap6.startline.makeblock('5', 2, 9, 0, 90);
        this.Bmap6.finishline.makeblock('1', 2, 9, 720, 90);
    };
    BombMode1.prototype.normal = function () {
        for (var i = 0; i < this.challenge.numChildren; i++) {
            var m_tile = this.challenge.getChildAt(i);
            m_tile.fire = false;
        } //让爆炸区恢复正常
    };
    BombMode1.prototype.setmap = function (n) {
        if (n === 1) {
            this.startline = this.Bmap1.startline;
            this.challenge = this.Bmap1.challenge;
            this.finishline = this.Bmap1.finishline;
        }
        if (n === 2) {
            this.startline = this.Bmap5.startline;
            this.challenge = this.Bmap5.challenge;
            this.finishline = this.Bmap5.finishline;
        }
        if (n === 3) {
            this.startline = this.Bmap3.startline;
            this.challenge = this.Bmap3.challenge;
            this.finishline = this.Bmap3.finishline;
        }
        if (n === 4) {
            this.startline = this.Bmap2.startline;
            this.challenge = this.Bmap2.challenge;
            this.finishline = this.Bmap2.finishline;
        }
        if (n === 5) {
            this.startline = this.Bmap6.startline;
            this.challenge = this.Bmap6.challenge;
            this.finishline = this.Bmap6.finishline;
        }
        if (n === 6) {
            this.startline = this.Bmap4.startline;
            this.challenge = this.Bmap4.challenge;
            this.finishline = this.Bmap4.finishline;
        }
        this.stage.addChild(this.challenge);
        this.stage.addChild(this.startline);
        this.stage.addChild(this.finishline);
        this.hero = game.hero;
        this.hero.pos(0, 300);
        this.stage.addChild(this.hero);
        this.stage.addChild(game.hero);
        this.stage.addChild(game.ctrl_rocker);
        this.stage.addChild(game.ctrl_rocker_move);
        this.stage.addChild(game.ctrl_back);
    };
    BombMode1.prototype.course = function () {
        this.startcnt++;
        if (this.coursenum === 1)
            course1(this);
        if (this.coursenum === 2)
            course5(this);
        if (this.coursenum === 3)
            course3(this);
        if (this.coursenum === 4)
            course2(this);
        if (this.coursenum === 5)
            course6(this);
        if (this.coursenum === 6)
            course4(this);
    };
    BombMode1.prototype.onfire = function (n) {
        var m_tile = this.challenge.getChildAt(n);
        m_tile.fire = true;
        for (var j = 0; j < m_tile.numChildren; j++) {
            var _tile = m_tile.getChildAt(j);
            _tile.bomb.play(0, false);
            Laya.SoundManager.playSound("res2/sound/bomb.wav", 1);
        } //让第n块瓷砖炸弹爆炸
    };
    BombMode1.prototype.regame = function () {
        if (this.hero.alive === 0) {
            for (var i = 0; i < this.stage.numChildren; i++) {
                var m_child = this.stage.getChildAt(i);
                m_child.removeSelf();
            }
            for (var i = 0; i < this.numChildren; i++) {
                var m_child = this.getChildAt(i);
                m_child.removeSelf();
            }
            revival++;
            Laya.SoundManager.playMusic("res/sound/bgm.mp3", 0);
            if (mapnum === 0) {
                var bg = new ThunderMode1();
                bg.setmap();
                this.hero.speedX = 0;
                this.hero.speedY = 0;
                this.hero.alive = 1;
                this.hero.burn.visible = false;
                this.hero.body.visible = false;
                this.timer.clear(this, this.judstate);
                this.timer.clear(this, this.course);
                Laya.stage.addChild(bg);
            }
            else {
                var bg = new BombMode1();
                bg.setmap(mapnum);
                bg.coursenum = mapnum;
                this.hero.speedX = 0;
                this.hero.speedY = 0;
                this.hero.alive = 1;
                this.hero.burn.visible = false;
                this.hero.body.visible = false;
                this.timer.clear(this, this.judstate);
                this.timer.clear(this, this.course);
                Laya.stage.addChild(bg);
            }
        }
    };
    BombMode1.prototype.judstate = function () {
        if (this.hero.alive === 0) {
            this.rebutton.pos(400, 400);
            this.rebutton.width = 45;
            this.rebutton.height = 45;
            this.rebutton.loadImage("res2/regame.png");
            this.rebutton.on(Laya.Event.CLICK, this, this.regame);
            Laya.stage.addChild(this.rebutton);
        } //若死亡，那么停止爆炸
        var m_tile = this.finishline;
        if (this.hero.alive === 1) {
            if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height)) {
                if (mapnum === 6) {
                    for (var i = 0; i < this.stage.numChildren; i++) {
                        var m_child = this.stage.getChildAt(i);
                        m_child.removeSelf();
                    }
                    for (var i = 0; i < this.numChildren; i++) {
                        var m_child = this.getChildAt(i);
                        m_child.removeSelf();
                    }
                    this.hero.alive = 0;
                    this.timer.clear(this, this.judstate);
                    this.timer.clear(this, this.course);
                    var bg = new InputName();
                    Laya.stage.addChild(bg);
                }
                else {
                    for (var i = 0; i < this.stage.numChildren; i++) {
                        var m_child = this.stage.getChildAt(i);
                        m_child.removeSelf();
                    }
                    for (var i = 0; i < this.numChildren; i++) {
                        var m_child = this.getChildAt(i);
                        m_child.removeSelf();
                    }
                    var bg = new BombMode1();
                    mapnum++;
                    bg.setmap(mapnum);
                    bg.coursenum = mapnum;
                    this.timer.clear(this, this.judstate);
                    this.timer.clear(this, this.course);
                    Laya.stage.addChild(bg); //如果角色到达了终点，则删除所有子节点与循环，进入下一个地图
                }
            }
        }
        if (this.hero.alive === 1) {
            var i = 0;
            var cnt = 0;
            for (i = 0; i < this.challenge.numChildren; i++) {
                var m_tile_2 = this.challenge.getChildAt(i);
                if ((this.hero.x + 20 >= m_tile_2.posX && this.hero.x + 20 <= m_tile_2.posX + m_tile_2.width * 45 && this.hero.y + 23 >= m_tile_2.posY && this.hero.y + 23 <= m_tile_2.posY + 45 * m_tile_2.height))
                    break;
                cnt++;
            }
            var _tile = this.challenge.getChildAt(i);
            if (cnt != this.challenge.numChildren) {
                if (_tile.fire === true && _tile.type != "5") {
                    DisplayWords(0);
                    this.hero.alive = 0;
                    makeunvisible(this.hero);
                    this.hero.burn.visible = true;
                    this.hero.burn.play(0, false);
                    Laya.SoundManager.playMusic("res/sound/gameover.wav", 1);
                }
            } //判断英雄是否被炸弹炸死
        }
        if (this.hero.alive === 1) {
            var cnt = 0;
            for (var i = 1; i < this.stage.numChildren - 2; i++) {
                var m_tile_3 = this.stage.getChildAt(i);
                if (i === 1) {
                    for (var j = 0; j < this.challenge.numChildren; j++) {
                        var _tile = this.challenge.getChildAt(j);
                        if ((this.hero.x + 20 >= _tile.posX && this.hero.x + 20 <= _tile.posX + _tile.width * 45 && this.hero.y + 23 >= _tile.posY && this.hero.y + 23 <= _tile.posY + 45 * _tile.height))
                            break;
                        cnt++;
                    }
                }
                else {
                    if ((this.hero.x + 20 >= m_tile_3.posX && this.hero.x + 20 <= m_tile_3.posX + m_tile_3.width * 45 &&
                        this.hero.y + 23 >= m_tile_3.posY && this.hero.y + 23 <= m_tile_3.posY + 45 * m_tile_3.height))
                        break;
                    cnt++;
                }
            }
            if (cnt === this.stage.numChildren + this.challenge.numChildren - 4 && this.hero.alive === 1) {
                this.hero.alive = 0;
                Laya.SoundManager.playMusic("res/sound/fall.wav", 1);
                makeunvisible(this.hero);
                this.hero.body.visible = true;
                this.hero.body.play(0, false);
                DisplayWords(0);
                if (this.hero.speedX < 0)
                    this.hero.x -= 20;
                if (this.hero.speedY < 0)
                    this.hero.y -= 20;
                if (this.hero.speedX > 0)
                    this.hero.x += 20;
                if (this.hero.speedY > 0)
                    this.hero.y += 20;
            } //同上
        }
    };
    return BombMode1;
}(Laya.Sprite));
function DisplayWords(n) {
    var w = 800;
    var offsetX = Laya.stage.width - w >> 1;
    var words;
    var letterText;
    if (n === 0)
        words = "GameOver";
    for (var i = 0, len = words.length; i < len; ++i) {
        letterText = createLetter(words.charAt(i));
        letterText.x = w / len * i + offsetX;
        letterText.y = -200;
        Laya.Tween.to(letterText, { y: 100 }, 3000, Laya.Ease.elasticOut, null, i * 100);
    }
}
function createLetter(char) {
    var letter = new Laya.Text();
    letter.text = char;
    letter.color = "#ffffff";
    letter.font = "Impact";
    letter.fontSize = 180;
    Laya.stage.addChild(letter);
    return letter;
}
function judelectricshock(hero, trap) {
    if (Math.abs(hero.x - trap.x) < 13 && Math.abs(hero.y - trap.y) < 30 && hero.alive === 1) { //判断闪电碰撞
        hero.right.visible = false;
        hero.left.visible = false;
        hero.up.visible = false;
        hero.down.visible = false;
        hero.stand.visible = false;
        hero.burn.visible = true;
        hero.burn.play(0, false);
        DisplayWords(0);
        Laya.SoundManager.playMusic("res/sound/thunder.wav", 1);
        hero.alive = 0;
    }
}
//炸弹爆炸规律
function course1(map) {
    if (map.startcnt / 40 === 1) {
        map.onfire(0);
    }
    if (map.startcnt / 65 === 1) {
        map.onfire(1);
    }
    if (map.startcnt / 90 === 1) {
        map.onfire(2);
    }
    if (map.startcnt / 115 === 1) {
        map.onfire(3);
    }
    if (map.startcnt / 140 === 1) {
        map.onfire(4);
    }
    if (map.startcnt / 165 === 1) {
        map.onfire(5);
    }
    if (map.startcnt / 190 === 1) {
        map.onfire(6);
    }
    if (map.startcnt / 215 === 1)
        map.startcnt = 0;
}
function course2(map) {
    if (map.startcnt / 40 === 1) {
        map.onfire(0);
        map.onfire(1);
        map.onfire(2);
        map.onfire(3);
        map.onfire(4);
    }
    if (map.startcnt / 120 === 1)
        map.startcnt = 0;
}
function course3(map) {
    if (map.startcnt / 40 === 1) {
        map.onfire(0);
        map.onfire(12);
    }
    if (map.startcnt / 65 === 1) {
        map.onfire(1);
        map.onfire(11);
    }
    if (map.startcnt / 90 === 1) {
        map.onfire(2);
        map.onfire(10);
    }
    if (map.startcnt / 115 === 1) {
        map.onfire(3);
        map.onfire(9);
    }
    if (map.startcnt / 140 === 1) {
        map.onfire(4);
        map.onfire(8);
    }
    if (map.startcnt / 165 === 1) {
        map.onfire(5);
        map.onfire(7);
    }
    if (map.startcnt / 250 === 1) {
        map.onfire(6);
    }
    if (map.startcnt / 300 === 1)
        map.startcnt = 0;
}
function course4(map) {
    if (map.startcnt / 40 === 1) {
        map.onfire(0);
    }
    if (map.startcnt / 50 === 1) {
        map.onfire(1);
    }
    if (map.startcnt / 60 === 1) {
        map.onfire(2);
    }
    if (map.startcnt / 90 === 1) {
        map.onfire(5);
    }
    if (map.startcnt / 100 === 1) {
        map.onfire(4);
    }
    if (map.startcnt / 110 === 1) {
        map.onfire(3);
    }
    if (map.startcnt / 170 === 1) {
        map.onfire(0);
        map.onfire(2);
        map.onfire(4);
    }
    if (map.startcnt / 230 === 1) {
        map.onfire(1);
        map.onfire(3);
        map.onfire(5);
    }
    if (map.startcnt / 290 === 1)
        map.startcnt = 0;
}
function course5(map) {
    if (map.startcnt / 40 === 1)
        map.onfire(0);
    if (map.startcnt / 100 === 1)
        map.onfire(1);
    if (map.startcnt / 150 === 1)
        map.startcnt = 0;
}
function course6(map) {
    if (map.startcnt / 40 === 1) {
        map.onfire(0);
        map.onfire(2);
        map.onfire(6);
        map.onfire(8);
    }
    if (map.startcnt / 80 === 1) {
        map.onfire(1);
        map.onfire(7);
    }
    if (map.startcnt / 120 === 1) {
        map.onfire(0);
        map.onfire(2);
        map.onfire(6);
        map.onfire(8);
    }
    if (map.startcnt / 160 === 1) {
        map.onfire(1);
        map.onfire(3);
        map.onfire(4);
        map.onfire(5);
        map.onfire(7);
    }
    if (map.startcnt / 200 === 1) {
        map.startcnt = 0;
    }
}
function makeunvisible(hero) {
    hero.right.visible = false;
    hero.left.visible = false;
    hero.up.visible = false;
    hero.down.visible = false;
    hero.stand.visible = false;
    hero.body.visible = false;
}
function DisplayRevival() {
    var Revtxt = new Laya.Text();
    Revtxt.text = "Revival: " + revival;
    Revtxt.color = "#ffffff";
    Revtxt.font = "Impact";
    Revtxt.fontSize = 50;
    Revtxt.pos(0, 0);
    Laya.stage.addChild(Revtxt);
}
