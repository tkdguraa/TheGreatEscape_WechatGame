class Hero extends Laya.Sprite {
    public body: Laya.Animation;
    public burn: Laya.Animation;
    public right: Laya.Animation;
    public left: Laya.Animation;
    public up: Laya.Animation;
    public down: Laya.Animation;
    public stand: Laya.Animation;
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
        this.right = new Laya.Animation();
        this.left = new Laya.Animation();
        this.up = new Laya.Animation();
        this.down = new Laya.Animation();
        this.stand = new Laya.Animation();
        this.speedX = 0;
        this.speedY = 0;
        // this.loadImage("res/Hero.png");
        this.body.loadAtlas("res/atlas/res.atlas",Laya.Handler.create(this,this.onLoaded));
        this.burn.loadAtlas("res/atlas/burn.atlas",Laya.Handler.create(this,this.onLoaded2));
        this.right.loadAtlas("res/atlas/goright.atlas",Laya.Handler.create(this,this.onLoaded3));
        this.left.loadAtlas("res/atlas/goleft.atlas",Laya.Handler.create(this,this.onLoaded4));
        this.up.loadAtlas("res/atlas/goup.atlas",Laya.Handler.create(this,this.onLoaded5));
        this.down.loadAtlas("res/atlas/godown.atlas",Laya.Handler.create(this,this.onLoaded6));
        this.stand.loadAtlas("res/atlas/normal.atlas",Laya.Handler.create(this,this.onLoaded7));
        
        this.right.play();
        this.left.play();
        this.up.play();
        this.down.play();
        this.stand.play();

        this.body.visible = false;
        this.burn.visible = false;
        this.right.visible = false;
        this.left.visible = false;
        this.up.visible = false;
        this.down.visible = false;
        this.stand.visible = false;

        this.body.interval = 200;
        this.burn.interval = 200;
        this.right.interval = 200;
        this.left.interval = 200;
        this.up.interval = 200;
        this.down.interval = 200;
        this.stand.interval = 200;
        this.burn.interval = 200;
        this.alive = 1;
    }
  public onLoaded(): void {
        this.addChild(this.body);
    }
    public onLoaded2(): void {
        this.addChild(this.burn);

    }
       public onLoaded3(): void {
        this.addChild(this.right); 
    }
       public onLoaded4(): void {
        this.addChild(this.left);
    }
       public onLoaded5(): void {    
        this.addChild(this.up);
    }
       public onLoaded6(): void {
        this.addChild(this.down);
    }
       public onLoaded7(): void {
        this.addChild(this.stand);
    }
} 