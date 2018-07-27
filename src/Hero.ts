class Hero extends Laya.Sprite{
    public body: Laya.Animation;
    public burn: Laya.Animation;
    public alive: number;
    public speedX: number;
    public speedY: number;
    constructor() {
        super();
        this.init();
    }
    init(): void {
        this.body = new Laya.Animation();
        this.burn = new Laya.Animation();
        this.speedX = 0;
        this.speedY = 0;
        // this.loadImage("res/Hero.png");
        this.body.loadAtlas("res/atlas/res.atlas",Laya.Handler.create(this,this.onLoaded));
        this.burn.loadAtlas("res/atlas/burn.atlas",Laya.Handler.create(this,this.onLoaded2));
        this.body.interval = 200;
        this.burn.interval = 200;
        this.alive = 1;
        
    }
    public onLoaded(): void {
        this.addChild(this.body);
    }
    public onLoaded2(): void {
        this.addChild(this.burn);
    }
} 