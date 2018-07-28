var Game = /** @class */ (function () {
    function Game() {
        // 初始屏幕适配
        this.stageW = 800;
        this.stageH = 600;
        this.ctrl_rocker_x = 50;
        this.ctrl_rocker_y = 400;
        Laya.MiniAdpter.init();
        Laya.init(800, 600);
        // 初始屏幕适配
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        this.init_ingame_images();
        this.bg = new StartBackGround();
        Laya.stage.addChild(this.bg);
        this.bg.Play.on(Laya.Event.CLICK, this, this.clickHandler);
        this.bg.Help.on(Laya.Event.CLICK, this, this.helpHandler);
        Laya.timer.frameLoop(1, this, this.gameLoop);
    }
    Game.prototype.init_ingame_images = function () {
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
        this.ctrl_rocker_move = new Laya.Image();
        this.ctrl_rocker_move.loadImage("res2/control-rocker.png");
        this.ctrl_rocker_move.pos(this.ctrl_rocker_x, this.ctrl_rocker_y);
        this.ctrl_rocker_move.pivot(17.5, 17.5);
        this.ctrl_rocker_move.visible = false;
    };
    Game.prototype.gameLoop = function () {
        if (this.hero.alive === 1) {
            this.ctrlRockerDown();
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
        if (this.hero.alive === 0) {
            this.rebutton.pos(400, 400);
            this.rebutton.width = 45;
            this.rebutton.height = 45;
            this.rebutton.loadImage("res2/regame.png");
            this.rebutton.on(Laya.Event.CLICK, this, this.regame);
            Laya.stage.addChild(this.rebutton);
        }
    };
    Game.prototype.regame = function () {
        var bg = new ThunderMode1();
        bg.setmap();
        this.hero.speedX = 0;
        this.hero.speedY = 0;
        this.hero.alive = 1;
        this.hero.burn.visible = false;
        this.hero.body.visible = false;
        Laya.stage.addChild(bg);
    };
    Game.prototype.clickHandler = function () {
        this.bg.removeSelf();
        this.bg2 = new ThunderMode1();
        this.bg2.setmap();
        Laya.stage.addChild(this.bg2);
    };
    Game.prototype.helpHandler = function () {
        this.instruction = new Instruction();
        Laya.stage.addChild(this.instruction);
    };
    Game.prototype.ctrlRockerUp = function () {
        if (Laya.stage.mouseX <= game.stageW / 2) {
            this.ctrl_rocker.visible = true;
            this.ctrl_rocker_move.visible = false;
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
            var angle = Math.atan2(Laya.stage.mouseY - game.ctrl_rocker_y, Laya.stage.mouseX - game.ctrl_rocker_x);
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
    return Game;
}());
var game = new Game();
//# sourceMappingURL=Main.js.map