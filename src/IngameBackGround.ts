class IngameBackground extends Laya.Sprite{
    private bg:Laya.Sprite;
    private hero:Hero;
    constructor(){
        super();
        this.init();
        this.stage.on(Laya.Event.KEY_DOWN,this,this.down);
    }
    init():void{
        this.bg = new Laya.Sprite();
        this.addChild(this.bg);
        this.bg.loadImage("res/stage.png");


        for(let i = 0;i < 8;i++){
            let challenge = new tile();
            if(i % 2 === 0)
            challenge.makeblock('2',15,2,45*2 + i * 90,90 + 45 * 3);
            else
            challenge.makeblock('3',15,2,45*2 + i * 90,90 + 45 * 3);

            this.addChild(challenge);  
        }

        let startline = new tile();
        startline.makeblock('1',2,9,0,90);
        this.addChild(startline);

        let finishline = new tile();
        finishline.makeblock('1',1,9,755,90);
        this.addChild(finishline);
        
        this.hero = new Hero();
        this.hero.loadImage("res/Hero.png");
        this.hero.pos(10,300);
        this.addChild(this.hero);
    }
    down(e){
        console.log(e.keyCode);
        if(e.keyCode === 37)
        this.hero.x -= 10;
        if(e.keyCode === 38)
        this.hero.y -= 10;
        if(e.keyCode === 39)
        this.hero.x += 10;
        if(e.keyCode === 40)
        this.hero.y += 10;
    }
}