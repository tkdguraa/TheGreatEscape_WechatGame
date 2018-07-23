class Hero extends Laya.Sprite{

    public SpeedX:number;
    public SpeedY:number;
    public PosX:number;
    public PosY:number;
    constructor(){
        super();
        this.init();
    }
    init():void{
        this.SpeedX = 0;
        this.SpeedY = 0;
        this.PosX = 0;
        this.PosY = 0;
    }
} 