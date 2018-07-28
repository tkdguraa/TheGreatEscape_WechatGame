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
        Laya.SoundManager.playMusic("res/sound/bgm.mp3", 0);
        console.log("this");
        _this.init();
        return _this;
    }
    StartBackGround.prototype.init = function () {
        //创造两个背景并连接，轮流播放
        this.bgFirst = new Laya.Sprite();
        this.bgFirst.loadImage("res2/background.jpg");
        this.addChild(this.bgFirst);
        this.bgSecond = new Laya.Sprite();
        this.bgSecond.loadImage("res2/background.jpg");
        this.bgSecond.pos(-800, 0);
        this.addChild(this.bgSecond);
        this.Help = new Laya.Button();
        this.Help.x = 730;
        this.Help.y = 0;
        this.Help.width = 70;
        this.Help.height = 70;
        this.Help.loadImage("res2/Help.png");
        this.addChild(this.Help);
        this.Play = new Laya.Button();
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
        if (this.bgFirst.x + this.x >= 800)
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
}(Laya.Sprite));
var Instruction = /** @class */ (function (_super) {
    __extends(Instruction, _super);
    function Instruction() {
        var _this = _super.call(this) || this;
        _this.Back = new Laya.Button();
        _this.bg = new Laya.Sprite();
        _this.bg.loadImage("res/instruction.png");
        _this.Back = new Laya.Button();
        _this.Back.x = 10;
        _this.Back.y = 510;
        _this.Back.width = 90;
        _this.Back.height = 45;
        _this.Back.loadImage("res/back.png");
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
    ThunderMode1.prototype.judstate = function () {
        var m_tile = this.finishline;
        if (this.hero.alive === 1) {
            if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height)) {
                for (var i = 0; i < this.stage.numChildren; i++) {
                    var m_child = this.stage.getChildAt(i);
                    m_child.removeSelf();
                }
                var bg = new BombMode1();
                bg.setmap(3);
                bg.coursenum = 3;
                mapnum = 3;
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
var mapnum = 1;
var BombMode1 = /** @class */ (function (_super) {
    __extends(BombMode1, _super);
    function BombMode1() {
        var _this = _super.call(this) || this;
        _this.init();
        _this.frameLoop(5, _this, _this.normal);
        _this.timer.frameLoop(1, _this, _this.course);
        _this.timer.frameLoop(1, _this, _this.judstate);
        _this.rebutton = new Laya.Button();
        return _this;
    }
    BombMode1.prototype.setmap = function (n) {
        if (n === 1) {
            this.startline = this.Bmap1.startline;
            this.challenge = this.Bmap1.challenge;
            this.finishline = this.Bmap1.finishline;
        }
        if (n === 2) {
            this.startline = this.Bmap2.startline;
            this.challenge = this.Bmap2.challenge;
            this.finishline = this.Bmap2.finishline;
        }
        if (n === 3) {
            this.startline = this.Bmap3.startline;
            this.challenge = this.Bmap3.challenge;
            this.finishline = this.Bmap3.finishline;
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
    };
    BombMode1.prototype.normal = function () {
        for (var i = 0; i < this.challenge.numChildren; i++) {
            var m_tile = this.challenge.getChildAt(i);
            m_tile.fire = false;
        } //让爆炸区恢复正常
    };
    BombMode1.prototype.course = function () {
        this.startcnt++;
        if (this.coursenum === 1)
            course1(this);
        if (this.coursenum === 2)
            course2(this);
        if (this.coursenum === 3)
            course3(this);
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
    BombMode1.prototype.judstate = function () {
        if (this.hero.alive === 0) {
            this.timer.clear(this, this.judstate);
            this.timer.clear(this, this.course);
        } //若死亡，那么停止爆炸
        var m_tile = this.finishline;
        if (this.hero.alive === 1) {
            if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height)) {
                if (mapnum === 3) {
                    DisplayWords(1);
                    this.hero.alive = 0;
                }
                else {
                    for (var i = 0; i < this.stage.numChildren; i++) {
                        var m_child = this.stage.getChildAt(i);
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
    if (n === 1)
        words = "WIN";
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
    if (map.startcnt / 80 === 1)
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
function makeunvisible(hero) {
    hero.right.visible = false;
    hero.left.visible = false;
    hero.up.visible = false;
    hero.down.visible = false;
    hero.stand.visible = false;
    hero.body.visible = false;
}
//# sourceMappingURL=BackGround.js.map