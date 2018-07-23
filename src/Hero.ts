class Hero extends Laya.Sprite{
    public inbox:boolean;
    constructor(){
        super();
        this.init();
    }
    init():void{
         this.loadImage("res/Hero.png");
         this.inbox = false;
    }
} 