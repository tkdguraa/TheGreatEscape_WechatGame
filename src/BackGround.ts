class StartBackGround extends Laya.Sprite {
    bgFirst: Laya.Sprite;
    bgSecond: Laya.Sprite;
    Play: Laya.Button;
    constructor() {
        super();
        this.init();
    }
    init(): void {
        //创造两个背景并连接，轮流播放
        this.bgFirst = new Laya.Sprite();
        this.bgFirst.loadImage("res/background.jpg");
        this.addChild(this.bgFirst);

        this.bgSecond = new Laya.Sprite();
        this.bgSecond.loadImage("res/background.jpg");
        this.bgSecond.pos(-800,0);
        this.addChild(this.bgSecond);

        this.Play = new Laya.Button();
        this.Play.x = 272;
        this.Play.y = 350;
        this.Play.width = 250;
        this.Play.height = 100;
        this.Play.loadImage("res/Play.png");
        this.addChild(this.Play);
       // this.on(Laya.Event.CLICK,this,this.clickHandler);

        this.DisplayTitle();

        Laya.timer.frameLoop(1, this ,this.onLoop);
    }
    onLoop(): void {
        this.bgFirst.x = this.bgFirst.x + 1;
        this.bgSecond.x = this.bgSecond.x + 1;

        if (this.bgFirst.x + this.x >= 800)
            this.bgFirst.x = this.bgFirst.x - 800 * 2;
        if (this.bgSecond.x + this.x >= 800)
            this.bgSecond.x = this.bgSecond.x - 800 * 2;
    }
       DisplayTitle(): void {
         //字符串总宽度
        let w: number = 500;
        let w2: number = 300;
        
         //文本创建时的起始x位置
        let offsetX: number = Laya.stage.width - w >> 1;
        let offsetX2: number = Laya.stage.width - w2 >> 1;

        let title1: string = "The GReat";
        let title2: string = "Escape";
        let letterText: Laya.Text;
        
         //根据字符串长度创建单个字符，并对每个单独字符使用缓动动画
        for (let i: number = 0, len: number = title1.length; i < len; ++i) {
            letterText = this.createLetter(title1.charAt(i));
            letterText.x = w / len * i + offsetX;     
            letterText.y = 0;     
             /**
                 * 对象letterText属性y从100缓动到300的位置，每一帧都通过回调方法更新颜色
                 * 用1000毫秒完成缓动效果
                 * 缓动类型采用bounceIn
                 * 单个字符的缓动效果结束后，使用changeColor回调函数将字符改变为红色
                 * 延迟间隔i*100毫秒执行
                 */    
           Laya.Tween.to(letterText, { y: 100, update: new Laya.Handler(this, this.updateColor,[letterText])}, 1000, Laya.Ease.bounceIn, Laya.Handler.create(this, this.changeColor, [letterText]), 100);
        }
        for (let i: number = 0, len: number = title2.length; i < len; ++i) {
            letterText = this.createLetter(title2.charAt(i));
            letterText.x = w2/len*i+offsetX2;
            letterText.y = 0;
            Laya.Tween.to(letterText, { y: 200, update: new Laya.Handler(this, this.updateColor,[letterText])}, 1000, Laya.Ease.bounceIn, Laya.Handler.create(this, this.changeColor, [letterText]), 100);
        }
}
    
    private updateColor(txt: Laya.Text): void {
        let c: number = Math.floor(Math.random() * 3);
        switch (c) {
            case 0:
                txt.color = "#912299";
                break;
            case 1:
                txt.color = "#ffffff";
                break;
            case 2:
                txt.color = "#8080ff";
                break;
            default:
                txt.color = "#eee000";
                break;
        }
    } 
    private changeColor(txt:Laya.Text): void {
        txt.color = "#f9e3f3";
    }
    private createLetter(char:string): Laya.Text {
        let letter: Laya.Text = new Laya.Text();
        letter.text = char;
        letter.color = "#ffffff";
        letter.font = "Impact";
        letter.fontSize = 100;
        this.addChild(letter);
        return letter;
    }
    
}

class thunderMode1 extends Laya.Sprite{
 
    private bg: Laya.Sprite;
    private hero: Hero;
    public startline: Tile;
    private challenge: Tile;
    constructor() {
        super();
        this.init();
        this.stage.on(Laya.Event.KEY_DOWN, this, this.down);
        this.frameLoop(1, this, this.Loop);
    }
    //width:20~30,height:5~45 trap    
    //width:5~35,height:5~45 hero
    init(): void {

        this.hero = game.hero;
        this.bg = new Laya.Sprite();
        this.bg.loadImage("res/stage.png");
        this.stage.addChild(this.bg);

        this.challenge = new Tile();
        for (let i = 0; i < 5; i++) {
            if(i % 2 === 0)
                this.challenge.makeblock('2', 3, 4, 45 + i * 135, 90 + 45 * 3);
            else
                this.challenge.makeblock('3', 3, 4, 45 + i * 135, 90 + 45 * 3);
            
            this.stage.addChild(this.challenge);  
        }
        
        this.startline = new Tile();
        this.startline.makeblock('5', 1, 9, 0, 90);
        this.stage.addChild(this.startline);

        let finishline:Tile = new Tile();
        finishline.makeblock('1', 2, 9, 720, 90);
        this.stage.addChild(finishline);
        
        this.stage.addChild(game.hero);
        this.stage.addChild(game.ctrl_rocker);
        this.stage.addChild(game.ctrl_rocker_move);
        this.stage.addChild(game.ctrl_back);
        
        this.createTrap(20, 3);
    }
    Loop(): void {
        for (let i: number = this.numChildren - 1; i >= 0; i--) {
            let trap: thunder = this.getChildAt(i) as thunder;
            
            let temp: number = Math.random();
            if (temp > 0.7 && trap.x + 5 < 660 )
                trap.x += trap.speed;
            else if (temp < 0.7 && temp > 0.4 && trap.x - 5 > 90)
                trap.x -= trap.speed;
            
            let temp2: number = Math.random();
            if (temp2 > 0.7 && trap.y + 55 < 600)
                trap.y += trap.speed;
            else if (temp2 < 0.7 && temp2 > 0.4 && trap.y - 5 > 0)
                trap.y -= trap.speed;
            //遍历每一个闪电,使它们按一定概率移动
                
            if (Math.abs(this.hero.x - trap.x) < 13 && Math.abs(this.hero.y - trap.y) < 30 && this.hero.alive === 1) {//判断碰撞
                console.log("failed!");
                Laya.SoundManager.playMusic("res/sound/thunder.wav",1);
                this.hero.body.removeSelf();
                this.hero.burn.play(0,false);
                this.hero.alive = 0 ;        
            }
        } 
    }
    createTrap(num: number,speed: number): void {
        for (let i = 0; i < num; i++) {
            let trap: thunder = Laya.Pool.getItemByClass("thunder", thunder);
            trap.init(speed);
            trap.pos(Math.random() * 600 + 90, Math.random() * 500 + 50);
            this.addChild(trap);
        }

        Laya.stage.on("mouseup", game, game.ctrlRockerUp)
        Laya.stage.on("mousemove", game, game.ctrlRockerDown)
    }
 
    down(e) {    
        if (this.hero.alive === 1) {
            if (e.keyCode === 37)
                this.hero.x -= 8;
                                
            if (e.keyCode === 38)
                this.hero.y -= 8;
                    
            if (e.keyCode === 39)
                this.hero.x += 8;         
            
            if (e.keyCode === 40)
                this.hero.y += 8;
        }
        let cnt: number = 0;
        for (let i: number = 1; i < this.stage.numChildren - 2; i++) {
                let m_tile: Tile = this.stage.getChildAt(i) as Tile;
                
            if (i === 1) {
                for (let j: number = 0; j < this.challenge.numChildren; j++) {
                    let _tile: Tile = this.challenge.getChildAt(j) as Tile;
                    console.log(_tile.posX,_tile.posY,_tile.width,_tile.height);
                    if ((this.hero.x + 20 >= _tile.posX && this.hero.x + 20 <= _tile.posX + _tile.width * 45 && this.hero.y + 23 >= _tile.posY && this.hero.y + 23 <= _tile.posY + 45 * _tile.height))
                        break;      
                    cnt++;
                }
            }
            else {
                if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && 
                        this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height))
                        break;
                    cnt++;
            }
        }
        console.log(this.stage.numChildren, this.challenge.numChildren,cnt);
        if (cnt === this.stage.numChildren + this.challenge.numChildren - 4 && this.hero.alive === 1) {
            console.log("die!");
            Laya.SoundManager.playMusic("res/sound/fall.m4a",1);
            this.hero.alive = 0;
            this.hero.burn.removeSelf();
            this.hero.body.play(0, false);

            if(e.keyCode === 37)
                this.hero.x -= 20;
                                
            if(e.keyCode === 38)
                this.hero.y -= 20;
                    
            if(e.keyCode === 39)
                this.hero.x += 20;         
            
            if(e.keyCode === 40)
                this.hero.y += 20;
        }
    }
}

class BombMode1 extends Laya.Sprite {
    private bg: Laya.Sprite;
    private hero: Hero;
    public startline: Tile;
    private challenge: Tile;
    constructor() {
        super();
        this.init();
        this.stage.on(Laya.Event.KEY_DOWN, this, this.down);
        this.frameLoop(5,this,this.normal);
        this.timer.frameLoop(100,this,this.onfire);
        this.timer.frameLoop(1,this,this.judbomb);
    }
    normal(): void {
        for (let i: number = 0; i < this.challenge.numChildren; i++) {
            let m_tile: Tile = this.challenge.getChildAt(i) as Tile;
            m_tile.fire = false;
            for (let j: number = 0; j < m_tile.numChildren; j++) {
                let _tile: Tile = m_tile.getChildAt(j) as Tile;
                _tile.loadImage("res/tile"+_tile.type+".png");
            }
        }
    }
    onfire(): void {
        for (let i: number = 0; i < this.challenge.numChildren; i++) {
            let m_tile: Tile = this.challenge.getChildAt(i) as Tile;
            m_tile.fire = true;
            for (let j: number = 0; j < m_tile.numChildren; j++) {
                let _tile: Tile = m_tile.getChildAt(j) as Tile;
                _tile.loadImage("res/tile6.png");
            }
        }
    }
    judbomb(): void {
        if (this.hero.alive === 1) {
            let i:number = 0;
            let cnt:number = 0;
            for (i = 0; i < this.challenge.numChildren; i++) {
            let m_tile: Tile = this.challenge.getChildAt(i) as Tile;
                if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height))
                    break;
                cnt++;
            }
            let _tile: Tile = this.challenge.getChildAt(i) as Tile;
            if (cnt != this.challenge.numChildren) {
                if (_tile.fire === true) {
                    console.log("he");
                    this.hero.alive = 0;
                    this.hero.body.removeSelf();
                    this.hero.burn.play(0,false);
                }
             }
    }     }
    init(): void {
        this.bg = new Laya.Sprite();
        this.stage.addChild(this.bg);
        this.bg.loadImage("res/stage2.png");
        this.challenge = new Tile();
        for (let i = 0; i < 5; i++) {
            if (i % 2 === 0)
                this.challenge.makeblock('2', 3, 4, 45 + i * 135, 90 + 45 * 3);
            else
                this.challenge.makeblock('3', 3, 4, 45 + i * 135, 90 + 45 * 3);
        
            this.stage.addChild(this.challenge);  
        }
        
        this.startline = new Tile();
        this.startline.makeblock('5', 1, 9, 0, 90);
        this.stage.addChild(this.startline);

        let finishline:Tile = new Tile();
        finishline.makeblock('1', 2, 9, 720, 90);
        this.stage.addChild(finishline);
       
        this.hero = new Hero();
        this.hero.init();
        this.hero.pos(0,300);
        this.stage.addChild(this.hero);
    }

 
    down(e) {    
        if (this.hero.alive === 1) {
            if (e.keyCode === 37)
                this.hero.x -= 8;
                                
            if (e.keyCode === 38)
                this.hero.y -= 8;
                    
            if (e.keyCode === 39)
                this.hero.x += 8;         
            
            if (e.keyCode === 40)
                this.hero.y += 8;
        }
        let cnt: number = 0;
        for (let i: number = 1; i < this.stage.numChildren - 2; i++) {
            let m_tile: Tile = this.stage.getChildAt(i) as Tile;
            
            if (i === 1) {
                for (let j: number = 0; j < this.challenge.numChildren; j++) {
                let _tile: Tile = this.challenge.getChildAt(j) as Tile;
                if ((this.hero.x + 20 >= _tile.posX && this.hero.x + 20 <= _tile.posX + _tile.width * 45 && this.hero.y + 23 >= _tile.posY && this.hero.y + 23 <= _tile.posY + 45 * _tile.height))
                        break;      
                cnt++;
                }
            }
            else {
                if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && 
                    this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height))
                    break;
                cnt++;
            }
        }
        console.log(this.stage.numChildren, this.challenge.numChildren,cnt);
        if (cnt === this.stage.numChildren + this.challenge.numChildren - 4 && this.hero.alive === 1) {
            console.log("die!");
            Laya.SoundManager.playMusic("res/sound/fall.m4a",1);
            this.hero.alive = 0;
            this.hero.burn.removeSelf();
            this.hero.body.play(0, false);
            if (e.keyCode === 37)
            this.hero.x -= 20;
                                
            if (e.keyCode === 38)
                this.hero.y -= 20;
                    
            if (e.keyCode === 39)
                this.hero.x += 20;         
            
            if (e.keyCode === 40)
                this.hero.y += 20;
            }
      }
}

