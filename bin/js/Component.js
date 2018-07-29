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
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        return _super.call(this) || this;
    }
    Tile.prototype.resPos = function () {
        this.posX = -1;
        this.posY = -1;
        this.width = -1;
        this.height = -1;
    };
    Tile.prototype.init = function (_type, posX, posY) {
        this.bomb = new Laya.Animation();
        this.type = _type;
        this.x = posX;
        this.y = posY;
        this.fire = false;
        this.pos(this.x, this.y);
        if (this.type === "2")
            this.bomb.loadAtlas("res2/atlas/boom1.atlas", Laya.Handler.create(this, this.exploison));
        else if (this.type === "3")
            this.bomb.loadAtlas("res2/atlas/boom2.atlas", Laya.Handler.create(this, this.exploison));
        this.loadImage("res2/tile" + this.type + ".png");
        this.bomb.interval = 100;
    };
    Tile.prototype.exploison = function () {
        this.addChild(this.bomb);
    };
    Tile.prototype.makeblock = function (_type, width, height, posX, posY) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.fire = false;
        this.type = _type;
        var block = new Tile();
        block.type = _type;
        block.posX = posX;
        block.posY = posY;
        block.width = width;
        block.height = height;
        block.fire = false;
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                var m_tile = new Tile();
                m_tile.init(_type, i * 45 + posX, 45 * j + posY);
                block.addChild(m_tile);
            } //combinate the small block to make bigger block;
        }
        this.addChild(block);
    };
    return Tile;
}(Laya.Sprite));
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super.call(this) || this;
        _this.startline = new Tile();
        _this.finishline = new Tile();
        _this.challenge = new Tile();
        return _this;
    }
    Map.prototype.savemap = function (start, challenge, finish) {
        this.startline = start;
        this.finishline = finish;
        this.challenge = challenge;
    };
    return Map;
}(Laya.Sprite));
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super.call(this) || this;
        _this.startline = new Tile();
        _this.finishline = new Tile();
        _this.challenge = new Tile();
        return _this;
    }
    Map.prototype.savemap = function (start, challenge, finish) {
        this.startline = start;
        this.finishline = finish;
        this.challenge = challenge;
    };
    return Map;
}(Laya.Sprite));
