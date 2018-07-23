class tile extends Laya.Sprite{
    public type:string;//type of tile;
    public width:number;
    public height:number;
    public posX:number;
    public posY:number;

    constructor(){
        super();
    }
    public init(_type:string, posX:number, posY:number):void{
        this.type = _type;
        this.loadImage("res/tile"+this.type+".png");
        this.x = posX;
        this.y = posY;
        this.pos(this.x,this.y);
    }
    public makeblock(_type:string, width:number, height:number, posX:number, posY:number):void{
           this.width = width;
           this.height = height;
           this.posX = posX;
           this.posY = posY;
           for(let i = 0 ; i < width; i++){
                for(let j = 0; j < height; j++){
                    let m_tile:tile = new tile();
                    m_tile.init(_type, i * 45 + posX, 45 * j + posY);
                    this.addChild(m_tile);
                }//combinate the small block to make bigger block;
            }
    }
}