var WebGL = Laya.WebGL;
var Game = /** @class */ (function () {
    function Game() {
        this.stageW = 800;
        this.stageH = 600;
        this.ctrl_rocker_x = 50;
        this.ctrl_rocker_y = 400;
        Laya.init(800, 600, WebGL);
        // 初始屏幕适配
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        this.init_ingame_images();
        this.bg = new StartBackGround();
        Laya.stage.addChild(this.bg);
        this.bg.Play.on(Laya.Event.CLICK, this, this.clickHandler);
        Laya.timer.frameLoop(1, this, this.gameLoop);
    }
    Game.prototype.init_ingame_images = function () {
        this.hero = new Hero();
        this.hero.loadImage("res/Hero.png");
        this.hero.pos(10, 300);
        this.ctrl_back = new Laya.Image();
        this.ctrl_back.loadImage("res/control-back.png");
        this.ctrl_back.pos(this.ctrl_rocker_x, this.ctrl_rocker_y);
        this.ctrl_back.pivot(40, 40);
        this.ctrl_rocker = new Laya.Image();
        this.ctrl_rocker.loadImage("res/control-rocker.png");
        this.ctrl_rocker.pos(this.ctrl_rocker_x, this.ctrl_rocker_y);
        this.ctrl_rocker.pivot(17.5, 17.5);
        this.ctrl_rocker_move = new Laya.Image();
        this.ctrl_rocker_move.loadImage("res/control-rocker.png");
        this.ctrl_rocker_move.pos(this.ctrl_rocker_x, this.ctrl_rocker_y);
        this.ctrl_rocker_move.pivot(17.5, 17.5);
        this.ctrl_rocker_move.visible = false;
    };
    Game.prototype.gameLoop = function () {
        this.ctrlRockerDown();
    };
    Game.prototype.clickHandler = function () {
        console.log('on click');
        this.bg.removeSelf();
        this.bg2 = new IngameBackground();
        Laya.stage.addChild(this.bg2);
    };
    Game.prototype.ctrlRockerUp = function () {
        if (Laya.stage.mouseX <= game.stageW / 2) {
            this.ctrl_rocker.visible = true;
            this.ctrl_rocker_move.visible = false;
        }
    };
    Game.prototype.ctrlRockerDown = function () {
        // stop moving
        if (distance(Laya.stage.mouseX, Laya.stage.mouseY, this.ctrl_back.x, this.ctrl_back.y) <= 0.2 * this.ctrl_back.width) {
            this.ctrl_rocker.visible = true;
            this.ctrl_rocker_move.visible = false;
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
            var angle = Math.atan2(Laya.stage.mouseY - game.ctrl_rocker_y, Laya.stage.mouseX - game.ctrl_rocker_x);
            this.hero.x += Math.cos(angle);
            this.hero.y += Math.sin(angle);
        }
        else {
            this.ctrl_rocker.visible = true;
            this.ctrl_rocker_move.visible = false;
        }
    };
    return Game;
}());
var game = new Game();
//# sourceMappingURL=Main.js.map