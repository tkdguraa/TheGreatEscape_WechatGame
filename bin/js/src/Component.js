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
var tile = /** @class */ (function (_super) {
    __extends(tile, _super);
    function tile() {
        return _super.call(this) || this;
    }
    tile.prototype.init = function (_type, posX, posY) {
        this.type = _type;
        this.loadImage("res/tile" + this.type + ".png");
        this.x = posX;
        this.y = posY;
        this.pos(this.x, this.y);
    };
    tile.prototype.makeblock = function (_type, width, height, posX, posY) {
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                var m_tile = new tile();
                m_tile.init(_type, i * 45 + posX, 45 * j + posY);
                this.addChild(m_tile);
            } //combinate the small block to make bigger block;
        }
    };
    return tile;
}(Laya.Sprite));
//# sourceMappingURL=Component.js.map