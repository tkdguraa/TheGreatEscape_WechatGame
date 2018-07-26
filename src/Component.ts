class Tile extends Laya.Sprite{
    public type:string;//type of tile;  red:bomb yellow:safe zone ;green: finish zone ;blue and purple: bomb zone;
    public width:number;
    public height:number;
    public posX:number;
    public posY:number;
    public bomb:Laya.Animation;
    public fire:boolean; //judge whether this tile is bomb now;
    constructor(){
        super();
    }
    public resPos():void{
        this.posX = -1;
        this.posY = -1;
        this.width = -1;
        this.height = -1;
    }
    public init(_type:string, posX:number, posY:number):void{
        this.bomb = new Laya.Animation();
        this.type = _type;
        this.x = posX;
        this.y = posY;
        this.fire = false;
        this.pos(this.x,this.y);
        this.loadImage("res/tile"+this.type+".png");

}
  
    public makeblock(_type:string, width:number, height:number, posX:number, posY:number):void{
           this.width = width;
           this.height = height;
           this.posX = posX;
           this.posY = posY;
           this.fire = false;
           this.type = _type;
           let block:Tile = new Tile();
           block.type = _type;
           block.posX = posX;
           block.posY = posY;
           block.width = width;
           block.height = height;
           block.fire = false;
           for(let i = 0 ; i < width; i++){
                for(let j = 0; j < height; j++){
                    let m_tile:Tile = new Tile();
                    m_tile.init(_type, i * 45 + posX, 45 * j + posY);
                    block.addChild(m_tile);
                }//combinate the small block to make bigger block;
            }
            this.addChild(block);
            //this.stage.addChild(block);
    }
}