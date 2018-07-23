var WebGL = Laya.WebGL;
var Game = /** @class */ (function () {
    function Game() {
        this.stageW = 800;
        this.stageH = 600;
        Laya.init(800, 600, WebGL);
        // 初始屏幕适配
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        this.bg = new StartBackGround();
        Laya.stage.addChild(this.bg);
        this.bg.Play.on(Laya.Event.CLICK, this, this.clickHandler);
    }
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
        if (Laya.stage.mouseX <= game.stageW / 2) {
            this.ctrl_rocker.visible = false;
            this.ctrl_rocker_move.visible = true;
            if (distance(Laya.stage.mouseX, Laya.stage.mouseY, this.ctrl_back.x, this.ctrl_back.y) <= (this.ctrl_back.width / 2 - this.ctrl_rocker.width / 2))
                this.ctrl_rocker_move.pos(Laya.stage.mouseX, Laya.stage.mouseY);
            else
                this.ctrl_rocker_move.pos(this.ctrl_back.x + (this.ctrl_back.width / 2 - this.ctrl_rocker.width / 2) * Math.cos(Math.atan2(Laya.stage.mouseY - this.ctrl_back.y, Laya.stage.mouseX - this.ctrl_back.x)), this.ctrl_back.y + (this.ctrl_back.width / 2 - this.ctrl_rocker.width / 2) * Math.sin(Math.atan2(Laya.stage.mouseY - this.ctrl_back.y, Laya.stage.mouseX - this.ctrl_back.x)));
            var angle = Math.atan2(Laya.stage.mouseY - this.ctrl_back.y, Laya.stage.mouseX - this.ctrl_back.x) * 180 / Math.PI;
            game.hero.x += Math.cos(angle) * 10;
            game.hero.y += Math.sin(angle) * 10;
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