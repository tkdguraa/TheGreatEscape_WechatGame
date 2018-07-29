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
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
<<<<<<< HEAD
        this.stageW = 800;
        this.stageH = 600;
        this.ctrl_rocker_x = 50;
        this.ctrl_rocker_y = 400;
        // 初始屏幕适配
        Laya.init(800, 600, WebGL);
        this.init_ingame_images();
        Laya.SoundManager.playMusic("res/sound/bgm.mp3", 0);
=======
        var _this = 
        // 初始屏幕适配
        _super.call(this) || this;
        _this.isHold = false;
        _this.stageW = 800;
        _this.stageH = 600;
        _this.ctrl_rocker_x = 50;
        _this.ctrl_rocker_y = 400;
        Laya.MiniAdpter.init();
        Laya.init(800, 600);
>>>>>>> 99f1a3b81d7d66b851109cb2aa61cc9f6987a636
        // 初始屏幕适配
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
<<<<<<< HEAD
        this.bg = new StartBackGround();
        Laya.stage.addChild(this.bg);
        this.bg.Play.on(Laya.Event.CLICK, this, this.clickHandler);
        this.bg.Help.on(Laya.Event.CLICK, this, this.helpHandler);
        Laya.timer.frameLoop(1, this, this.gameLoop);
=======
        Laya.stage.on("mouseup", _this, _this.ctrlRockerUp);
        _this.init_ingame_images();
        _this.init_server_connection();
        // main game loop
        Laya.timer.frameLoop(1, _this, _this.gameLoop);
        return _this;
>>>>>>> 99f1a3b81d7d66b851109cb2aa61cc9f6987a636
    }
    Game.prototype.init_ingame_images = function () {
        var _this = this;
        this.hero = new Hero();
        this.hero.pos(10, 300);
        this.rebutton = new Laya.Button();
        this.ctrl_back = new Laya.Image();
        this.ctrl_back.loadImage("res2/control-back.png");
        this.ctrl_back.pos(this.ctrl_rocker_x, this.ctrl_rocker_y);
        this.ctrl_back.pivot(40, 40);
        this.ctrl_rocker = new Laya.Image();
        this.ctrl_rocker.loadImage("res2/control-rocker.png");
        this.ctrl_rocker.pos(this.ctrl_rocker_x, this.ctrl_rocker_y);
        this.ctrl_rocker.pivot(17.5, 17.5);
        this.ctrl_rocker.on(Laya.Event.MOUSE_DOWN, this, function () { _this.isHold = true; });
        this.ctrl_rocker_move = new Laya.Image();
        this.ctrl_rocker_move.loadImage("res2/control-rocker.png");
        this.ctrl_rocker_move.pos(this.ctrl_rocker_x, this.ctrl_rocker_y);
        this.ctrl_rocker_move.pivot(17.5, 17.5);
        this.ctrl_rocker_move.visible = false;
        this.ctrl_rocker_move.on(Laya.Event.MOUSE_DOWN, this, function () { _this.isHold = true; });
        this.bg = new StartBackGround();
        Laya.stage.addChild(this.bg);
        this.bg.Play.on(Laya.Event.CLICK, this, this.clickHandler);
        this.bg.Help.on(Laya.Event.CLICK, this, this.helpHandler);
        this.bg.Rank.on(Laya.Event.CLICK, this, this.rankHandler);
    };
    Game.prototype.init_server_connection = function () {
        this.hr_get = new Laya.HttpRequest();
        this.hr_get.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        this.hr_get.once(Laya.Event.COMPLETE, this, this.onHttpRequestCompleteGet);
        this.hr_post = new Laya.HttpRequest();
        this.hr_post.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        this.hr_post.once(Laya.Event.COMPLETE, this, this.onHttpRequestCompletePost);
    };
    Game.prototype.gameLoop = function () {
        if (this.hero.alive === 1) {
<<<<<<< HEAD
            this.ctrlRockerDown();
=======
            if (this.isHold)
                this.ctrlRockerDown();
>>>>>>> 99f1a3b81d7d66b851109cb2aa61cc9f6987a636
            this.hero.right.visible = false;
            this.hero.left.visible = false;
            this.hero.up.visible = false;
            this.hero.down.visible = false;
            this.hero.stand.visible = false;
            if (this.hero.speedX === 0 && this.hero.speedY === 0)
                this.hero.stand.visible = true;
            else if (this.hero.speedX > 0 && (Math.abs(this.hero.speedX) > Math.abs(this.hero.speedY)))
                this.hero.right.visible = true;
            else if (this.hero.speedX < 0 && (Math.abs(this.hero.speedX) > Math.abs(this.hero.speedY)))
                this.hero.left.visible = true;
            else if (this.hero.speedY > 0 && (Math.abs(this.hero.speedY) > Math.abs(this.hero.speedX)))
                this.hero.down.visible = true;
            else if (this.hero.speedY < 0 && (Math.abs(this.hero.speedY) > Math.abs(this.hero.speedX)))
                this.hero.up.visible = true;
            this.hero.x += this.hero.speedX;
            this.hero.y += this.hero.speedY;
        }
    };
    Game.prototype.clickHandler = function () {
        this.bg.removeSelf();
<<<<<<< HEAD
=======
        revival = 0;
>>>>>>> 99f1a3b81d7d66b851109cb2aa61cc9f6987a636
        this.bg2 = new ThunderMode1();
        this.bg2.setmap();
        Laya.stage.addChild(this.bg2);
    };
    Game.prototype.helpHandler = function () {
<<<<<<< HEAD
        this.instruction = new Instruction();
        Laya.stage.addChild(this.instruction);
    };
=======
        console.log("help");
        this.instruction = new Instruction();
        Laya.stage.addChild(this.instruction);
    };
    Game.prototype.rankHandler = function () {
        this.scoreboard = new Scoreboard();
        Laya.stage.addChild(this.scoreboard);
        game.getRanking();
    };
>>>>>>> 99f1a3b81d7d66b851109cb2aa61cc9f6987a636
    Game.prototype.ctrlRockerUp = function () {
        if (Laya.stage.mouseX <= this.stageW / 2) {
            this.ctrl_rocker.visible = true;
            this.ctrl_rocker_move.visible = false;
            this.hero.speedX = 0;
            this.hero.speedY = 0;
            this.isHold = false;
        }
    };
    Game.prototype.ctrlRockerDown = function () {
        // stop moving. control rocker is centered
        if (distance(Laya.stage.mouseX, Laya.stage.mouseY, this.ctrl_back.x, this.ctrl_back.y) <= 0.2 * this.ctrl_back.width) {
            this.ctrl_rocker.visible = true;
            this.ctrl_rocker_move.visible = false;
            this.hero.speedX = 0;
            this.hero.speedY = 0;
            return;
        }
        // moving
        if (distance(Laya.stage.mouseX, Laya.stage.mouseY, this.ctrl_back.x, this.ctrl_back.y) <= 2 * this.ctrl_back.width) {
            this.ctrl_rocker.visible = false;
            this.ctrl_rocker_move.visible = true;
            // move control rocker
            if (distance(Laya.stage.mouseX, Laya.stage.mouseY, this.ctrl_back.x, this.ctrl_back.y) <= (this.ctrl_back.width / 2 - this.ctrl_rocker.width / 2))
                this.ctrl_rocker_move.pos(Laya.stage.mouseX, Laya.stage.mouseY);
            else
                this.ctrl_rocker_move.pos(this.ctrl_back.x + (this.ctrl_back.width / 2 - this.ctrl_rocker.width / 2) * Math.cos(Math.atan2(Laya.stage.mouseY - this.ctrl_back.y, Laya.stage.mouseX - this.ctrl_back.x)), this.ctrl_back.y + (this.ctrl_back.width / 2 - this.ctrl_rocker.width / 2) * Math.sin(Math.atan2(Laya.stage.mouseY - this.ctrl_back.y, Laya.stage.mouseX - this.ctrl_back.x)));
            // move hero
<<<<<<< HEAD
            var angle = Math.atan2(Laya.stage.mouseY - game.ctrl_rocker_y, Laya.stage.mouseX - game.ctrl_rocker_x);
=======
            var angle = Math.atan2(Laya.stage.mouseY - this.ctrl_rocker_y, Laya.stage.mouseX - this.ctrl_rocker_x);
>>>>>>> 99f1a3b81d7d66b851109cb2aa61cc9f6987a636
            this.hero.speedX = 2 * Math.cos(angle);
            this.hero.speedY = 2 * Math.sin(angle);
        }
        else {
            this.ctrl_rocker.visible = true;
            this.ctrl_rocker_move.visible = false;
            this.hero.speedX = 0;
            this.hero.speedY = 0;
        }
    };
    Game.prototype.onHttpRequestError = function (err) {
        if (err)
            console.log('err' + err);
    };
    // send GET ranking request to redis server
    Game.prototype.getRanking = function () {
        this.hr_get.send('http://192.144.144.22:12306/ranking', null, 'get', 'json');
    };
    // send POST ranking request to redis server
    Game.prototype.sendRanking = function (name, score) {
        this.hr_post.send('http://192.144.144.22:12306/ranking', 'name=' + name + '&score=' + score, 'post', 'json');
    };
    // get GET response from redis server
    Game.prototype.onHttpRequestCompleteGet = function () {
        var data = this.hr_get.data;
        this.scoreboard.Rank1.text = "1:   " + data.result[0] + "    " + data.result[1];
        this.scoreboard.Rank2.text = "2:   " + data.result[2] + "    " + data.result[3];
        this.scoreboard.Rank3.text = "3:   " + data.result[4] + "    " + data.result[5];
        this.scoreboard.Rank4.text = "4:   " + data.result[6] + "    " + data.result[7];
        this.scoreboard.Rank5.text = "5:   " + data.result[8] + "    " + data.result[9];
        for (var i = 0; i <= data.result.length / 2; i++) {
            if (Number(data.result[i * 2 + 1]) === Number(revival)) {
                this.scoreboard.MyRank.text = "Your Rank:   " + Number(i + 1);
                break;
            }
        }
    };
    // get POST response from redis server
    Game.prototype.onHttpRequestCompletePost = function (res) {
        console.log('post complete' + res);
    };
    return Game;
}(Laya.Sprite));
var game = new Game();
