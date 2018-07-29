let revival:number = 0;
let mapnum:number = 0;
let username:string;
class InputName extends Laya.Sprite{
    okbutton: Laya.Button;
    bg: Laya.Sprite;
    title: Laya.Text;
    yourname: Laya.TextInput;
    constructor() {
        super();
        this.bg = new Laya.Sprite();
        this.okbutton = new Laya.Button();
        this.title = new Laya.Text();
        this.yourname = new Laya.TextInput();

        this.title.text = "               You made it! \n Please tell us your name:";
        this.title.color = "#ffffff";
        this.title.font = "Impact";
        this.title.fontSize = 50;
        this.title.pos(100,0);

        this.yourname.wordWrap = true;
        this.yourname.fontSize = 30;
        this.yourname.pos(250, 230);
        this.yourname.width = 250;
        this.yourname.height = 50;
        this.yourname.bgColor = "#c30c30";
        //游戏完全通关之后 输入名字的输入栏信息。

        this.bg.loadImage("res2/scoreboard.png");
        this.okbutton.loadImage("res2/ok.png");
        this.okbutton.pos(520,230);
        this.okbutton.on(Laya.Event.CLICK,this,this.backtostart);

        this.addChild(this.bg);
        this.addChild(this.yourname);
        this.addChild(this.title);
        this.addChild(this.okbutton);
    }
    backtostart(): void{
           for (let i: number = 0; i < this.numChildren; i++) {
                let m_child: Laya.Sprite = this.getChildAt(i) as Laya.Sprite;
                m_child.removeSelf();
            }
            let bg = new Game();
            username = this.yourname.text;
            game.sendRanking(username, revival);
            
            game.hero.alive = 1;
            revival = 0;
            Laya.stage.addChild(bg);
    }
}
class StartBackGround extends Laya.Sprite {
    bgFirst: Laya.Sprite;
    bgSecond: Laya.Sprite;
    Play: Laya.Button;
    Help: Laya.Button;
    Rank: Laya.Button;
    constructor() {
        super();
        Laya.SoundManager.playMusic("res/sound/bgm.mp3",0);
        this.init();
    }
    init(): void {
        //创造两个背景并连接，轮流播放
        this.bgFirst = new Laya.Sprite();
        this.bgFirst.loadImage("res2/background.jpg");
   
        this.addChild(this.bgFirst);

        this.bgSecond = new Laya.Sprite();
        this.bgSecond.loadImage("res2/background.jpg");
        this.bgSecond.pos(-800,0);
        this.addChild(this.bgSecond);

        this.Help = new Laya.Button();
        this.Help.x = 730;
        this.Help.y = 0;
        this.Help.width = 70;
        this.Help.height = 70;
        this.Help.loadImage("res2/Help.png");
        this.addChild(this.Help);
        
        this.Rank = new Laya.Button();
        this.Rank.x = 0;
        this.Rank.y = 0;
        this.Rank.width = 90;
        this.Rank.height =45;
        this.Rank.loadImage("res2/rank.png");
        this.addChild(this.Rank);

        this.Play = new Laya.Button();
        this.Play.x = 272;
        this.Play.y = 350;
        this.Play.width = 250;
        this.Play.height = 100;
        this.Play.loadImage("res2/Play.png");
        this.addChild(this.Play);

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
        
        for (let i: number = 0, len: number = title1.length; i < len; ++i) {
            letterText = this.createLetter(title1.charAt(i));
            letterText.x = w / len * i + offsetX;     
            letterText.y = 0;     
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
    private changeColor(txt: Laya.Text): void {
        txt.color = "#f9e3f3";
    }
    private createLetter(char: string): Laya.Text {
        let letter: Laya.Text = new Laya.Text();
        letter.text = char;
        letter.color = "#ffffff";
        letter.font = "Impact";
        letter.fontSize = 100;
        this.addChild(letter);
        return letter;
    }
    
}
class Scoreboard extends Laya.Sprite{
    public bg: Laya.Sprite;
    public Back: Laya.Button;
    public Ranking: Laya.Sprite;
    public Rank1: Laya.Text;
    public Rank2: Laya.Text;
    public Rank3: Laya.Text;
    public Rank4: Laya.Text;
    public Rank5: Laya.Text;

    constructor(){
        super();
        this.Ranking = new Laya.Sprite();
        this.Ranking.x = 200;
        this.Ranking.y = 0;
        this.Ranking.loadImage("res2/Ranking.png");

        this.Back = new Laya.Button();
        this.bg = new Laya.Sprite();
        this.bg.loadImage("res2/scoreboard.png");
        this.Back = new Laya.Button();
        this.Back.x = 10;
        this.Back.y = 510;
        this.Back.width = 90;
        this.Back.height = 45;
        this.Back.loadImage("res2/back.png");
        this.addChild(this.bg);
        this.addChild(this.Back);
        this.addChild(this.Ranking);
        this.Back.on(Laya.Event.CLICK,this,this.backtoStart);
    }
    backtoStart(): void{
        this.bg.removeSelf();
        this.Back.removeSelf();
        Laya.stage.addChild(game.bg);
    }
}
class Instruction extends Laya.Sprite{
    public bg: Laya.Sprite;
    public Back: Laya.Button;
    constructor(){
        super();
        this.Back = new Laya.Button();
        this.bg = new Laya.Sprite();
        this.bg.loadImage("res2/instruction.png");
        this.Back = new Laya.Button();
        this.Back.x = 10;
        this.Back.y = 510;
        this.Back.width = 90;
        this.Back.height = 45;
        this.Back.loadImage("res2/back.png");
        this.addChild(this.bg);
        this.addChild(this.Back);
        this.Back.on(Laya.Event.CLICK,this,this.backtoStart);
    }
    backtoStart(): void{
        this.bg.removeSelf();
        this.Back.removeSelf();
        Laya.stage.addChild(game.bg);
    }
}

class ThunderMode1 extends Laya.Sprite {
 
    private bg: Laya.Sprite;
    private hero: Hero;
    public startline: Tile;
    public challenge: Tile;
    public finishline: Tile;
    public rebutton: Laya.Button;
    public thu: Thunder;

    public Tmap1: Map;
    constructor() {
        super();
        this.init();
        this.rebutton = new Laya.Button();
        this.thu = new Thunder();
        this.frameLoop(1, this, this.Loop);
        this.frameLoop(1, this, this.judstate);
        DisplayRevival();
    }
    setmap(): void {
        this.challenge = this.Tmap1.challenge;
        this.startline = this.Tmap1.startline;
        this.finishline = this.Tmap1.finishline;
        
        this.stage.addChild(this.challenge);
        this.stage.addChild(this.startline);
        this.stage.addChild(this.finishline);
        this.hero = game.hero;
        this.hero.pos(0, 300);
        this.stage.addChild(this.hero);
        this.stage.addChild(game.hero);
        this.stage.addChild(game.ctrl_rocker);
        this.stage.addChild(game.ctrl_rocker_move);
        this.stage.addChild(game.ctrl_back);
        this.createTrap(20, 3);
        this.stage.addChild(this.thu);
    }  
    regame(): void {
        if (this.hero.alive === 0){
            revival++;
            for (let i: number = 0; i < this.stage.numChildren; i++) {
                    let m_child: Laya.Sprite = this.stage.getChildAt(i) as Laya.Sprite;
                    m_child.removeSelf();
            }
            for (let i: number = 0; i < this.numChildren; i++) {
                     let m_child: Laya.Sprite = this.getChildAt(i) as Laya.Sprite;
                     m_child.removeSelf();
            }
            Laya.SoundManager.playMusic("res/sound/bgm.mp3",0);
            let bg = new ThunderMode1();
            bg.setmap();
            this.hero.speedX = 0;
            this.hero.speedY = 0;
            this.hero.alive = 1;
            this.hero.burn.visible = false;
            this.hero.body.visible = false;
            Laya.stage.addChild(bg);
        }
    }      
    judstate(): void {
            let m_tile = this.finishline;
            if (this.hero.alive === 1) {
                if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height)) {
                
                    for (let i: number = 0; i < this.stage.numChildren; i++) {
                        let m_child: Laya.Sprite = this.stage.getChildAt(i) as Laya.Sprite;
                        m_child.removeSelf();
                    }
                    for (let i: number = 0; i < this.numChildren; i++) {
                        let m_child: Laya.Sprite = this.getChildAt(i) as Laya.Sprite;
                        m_child.removeSelf();
                    } 
                    let bg = new BombMode1();
                
                    mapnum ++;
                    bg.setmap(mapnum);
                    bg.coursenum = mapnum;
                    console.log(mapnum);
                    this.hero.speedX = 0;
                    this.hero.speedY = 0;
                    this.timer.clear(this,this.judstate);
                    this.timer.clear(this,this.Loop);
                    Laya.stage.addChild(bg);
                }    
            }//若角色到达终点，则删除所有节点与循环，移动到下一个地图
            let cnt:number = 0;

            for (let i: number = 1; i < this.stage.numChildren - 2; i++) {
                let m_tile: Tile = this.stage.getChildAt(i) as Tile;
                
                if (i === 1) { 
                    for (let j: number = 0; j < this.challenge.numChildren; j++) {
                        let _tile: Tile = this.challenge.getChildAt(j) as Tile;
                        if ((this.hero.x + 20 >= _tile.posX && this.hero.x + 20 <= _tile.posX + _tile.width * 45 && this.hero.y + 23 >= _tile.posY && this.hero.y + 23 <= _tile.posY + 45 * _tile.height))
                            break;
                        cnt++;
                    }
                } else {
                    if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && 
                        this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height))
                        break;
                    
                    cnt++;
                }
            }
            if (cnt === this.stage.numChildren + this.challenge.numChildren - 4 && this.hero.alive === 1) {
                Laya.SoundManager.playMusic("res/sound/fall.wav",1);
                DisplayWords(0);
                this.hero.alive = 0;
                makeunvisible(this.hero);
                this.hero.body.visible = true;
                this.hero.body.play(0,false);

                if (this.hero.speedX < 0)
                    this.hero.x -= 20;
                                            
                if (this.hero.speedY < 0)
                    this.hero.y -= 20;
                        
                if (this.hero.speedX > 0)
                    this.hero.x += 20;         
                
                if (this.hero.speedY > 0)
                    this.hero.y += 20;
            }
            if(this.hero.alive === 0){
                 this.rebutton.pos(400, 400);
                 this.rebutton.width = 45;
                 this.rebutton.height = 45;
                 this.rebutton.loadImage("res2/regame.png");
                 this.rebutton.on(Laya.Event.CLICK,this,this.regame);
                 Laya.stage.addChild(this.rebutton);
            }
            if(this.hero.alive === 0){
                 this.timer.clear(this,this.judstate);
                 this.timer.clear(this,this.Loop);
                 mapnum = 0;
                 for (let i: number = this.thu.numChildren - 1; i >= 0; i--) {
                    let trap: Thunder = this.thu.getChildAt(i) as Thunder;
                    trap.removeSelf();   
                 }//给予每一个闪电速度
            }
    }//遍历每块瓷砖，知道找到英雄所处的瓷砖为止若遍历了所有瓷砖，则说明英雄不再瓷砖上，判掉落
   

    Loop(): void {
        for (let i: number = this.thu.numChildren - 1; i >= 0; i--) {
            let trap: Thunder = this.thu.getChildAt(i) as Thunder;
            
            let temp: number = Math.random();
            if(temp > 0.7 && trap.x + 5 < 660 )
                trap.x += trap.speed;
            else if(temp < 0.7 && temp > 0.4 && trap.x - 5 > 90)
                trap.x -= trap.speed;
            
            let temp2: number = Math.random();
            if (temp2 > 0.7 && trap.y + 55 < 600)
                trap.y += trap.speed;
            else if(temp2 < 0.7 && temp2 > 0.4 && trap.y - 5 > 0)
                trap.y -= trap.speed;

            judelectricshock(this.hero,trap);
        }//给予每一个闪电速度
    }  
    init(): void {
        this.bg = new Laya.Sprite();
        this.hero = game.hero;
        this.stage.addChild(this.bg);
        this.bg.loadImage("res2/stage.png");
        
        this.startline = new Tile();
        this.challenge = new Tile();
        this.finishline = new Tile();
        this.Tmap1 = new Map();
        this.Tmap1.startline.makeblock('5', 1, 9, 0, 90);
        this.Tmap1.finishline.makeblock('1', 2, 9, 720, 90);
        this.Tmap1.challenge.makeblock('2', 15, 9, 45, 90);
    
    }
    createTrap(num: number,speed: number): void {
        for (let i = 0; i < num; i++) {
            let trap: Thunder = Laya.Pool.getItemByClass("thunder", Thunder);
            trap.init(speed);
            trap.pos(Math.random() * 600 + 90, Math.random() * 500 + 50);
            this.thu.addChild(trap);
        }
    }
}

class BombMode1 extends Laya.Sprite {
    private bg: Laya.Sprite;
    private hero: Hero;
    public startline: Tile;
    public challenge: Tile;
    public finishline: Tile;
    public coursenum: number;
    public Bmap1: Map;
    public Bmap2: Map;
    public Bmap3: Map;
    public Bmap4: Map;
    public Bmap5: Map;
    public Bmap6: Map;
    public rebutton: Laya.Button;
    public startcnt: number;
    constructor() {
        super();
        this.init();
        this.frameLoop(5, this, this.normal);
        this.timer.frameLoop(1, this, this.course);
        this.timer.frameLoop(1, this, this.judstate);
        this.rebutton = new Laya.Button();
        DisplayRevival();
    }
     
    init(): void {
        this.bg = new Laya.Sprite();
        this.stage.addChild(this.bg);
        this.bg.loadImage("res2/stage2.png");
        this.startcnt = 0;
        this.Bmap1 = new Map(); 
        //制作地图
         for (let i = 0; i < 8; i++){
            if (i % 2 === 0)
                 this.Bmap1.challenge.makeblock('2', 2, 2, 90 + i * 90, 90 + 90);
            else
                 this.Bmap1.challenge.makeblock('3', 2, 2, 90 + i * 90, 90 + 90);
           }
        this.Bmap1.startline.makeblock('5', 2, 9, 0, 90);
        this.Bmap1.finishline.makeblock('1', 2, 9, 720, 90);

        this.Bmap2 = new Map();
           for (let i = 0; i < 5; i++){
            if (i % 2 === 0)
                 this.Bmap2.challenge.makeblock('2', 3, 4, 90 + i * 135, 90 + 45 * 3);
            else
                 this.Bmap2.challenge.makeblock('3', 3, 4, 90 + i * 135, 90 + 45 * 3);
           }
        this.Bmap2.challenge.makeblock('5', 2, 1, 45 * 3, 180);
        this.Bmap2.challenge.makeblock('5', 2, 1, 45 * 6, 180);
        this.Bmap2.challenge.makeblock('5', 2, 1, 45 * 9, 180);
        this.Bmap2.challenge.makeblock('5', 2, 1, 45 * 12, 180);   
                  
        this.Bmap2.startline.makeblock('5', 2, 9, 0, 90);
        this.Bmap2.finishline.makeblock('1', 1, 9, 765, 90);
        
        this.Bmap3 = new Map();
        for (let i = 0; i < 6; i++)
            this.Bmap3.challenge.makeblock('2', 1, 5, 90 + i * 45, 90 + 90);
        this.Bmap3.challenge.makeblock('3', 2, 3, 90 + 6 * 45, 90 + 135);
        for (let i = 0; i < 6; i++)
            this.Bmap3.challenge.makeblock('2', 1, 5, 90 + 8 * 45 + i * 45, 90 + 90);
        this.Bmap3.startline.makeblock('5', 2, 9, 0, 90);
        this.Bmap3.finishline.makeblock('1', 2, 9, 720,90)

        this.Bmap4 = new Map();
        for (let i = 0; i < 6; i++)
            if(i % 2 === 0)
                this.Bmap4.challenge.makeblock('2', 2, 2, 90 + i * 90, 90 + 45 * 4);
            else
                this.Bmap4.challenge.makeblock('3', 2, 2, 90 + i * 90, 90 + 45 * 4);
      
        this.Bmap4.startline.makeblock('5', 2, 9, 0, 90);
        this.Bmap4.finishline.makeblock('1', 2, 9, 630,90)

        this.Bmap5 = new Map();
        this.Bmap5.challenge.makeblock('2', 13, 2, 90, 90 + 45 * 3);
        this.Bmap5.challenge.makeblock('3', 13, 2, 90, 90 + 45 * 5);

        this.Bmap5.startline.makeblock('5', 2, 9, 0, 90);
        this.Bmap5.finishline.makeblock('1', 2, 9, 675,90)

        this.Bmap6 = new Map();
        for (let i = 0; i < 3; i++)
            this.Bmap6.challenge.makeblock('2', 2, 2, 90 + 90 * i, 90);
        for (let i = 0; i < 3; i++) 
            this.Bmap6.challenge.makeblock('3', 2, 2, 270 + 90 * i, 90 + 90);
        for (let i = 0; i < 3; i++)
            this.Bmap6.challenge.makeblock('2', 2, 2, 450 + 90 * i, 90 + 90 * 2);
        this.Bmap6.startline.makeblock('5', 2, 9, 0, 90);
        this.Bmap6.finishline.makeblock('1', 2, 9, 720,90)
    }
    normal(): void {
        for (let i: number = 0; i < this.challenge.numChildren; i++) {
            let m_tile: Tile = this.challenge.getChildAt(i) as Tile;
            m_tile.fire = false;
        }//让爆炸区恢复正常
    }
    setmap(n: number): void {
        if (n === 1) {
            this.startline = this.Bmap1.startline;
            this.challenge = this.Bmap1.challenge;
            this.finishline = this.Bmap1.finishline;
        }
        if (n === 2) {
            this.startline = this.Bmap5.startline;
            this.challenge = this.Bmap5.challenge;
            this.finishline = this.Bmap5.finishline;
        }
        if (n === 3) {
            this.startline = this.Bmap3.startline;
            this.challenge = this.Bmap3.challenge;
            this.finishline = this.Bmap3.finishline;
        }
         if (n === 4) {
            this.startline = this.Bmap2.startline;
            this.challenge = this.Bmap2.challenge;
            this.finishline = this.Bmap2.finishline;
        }
         if (n === 5) {
            this.startline = this.Bmap6.startline;
            this.challenge = this.Bmap6.challenge;
            this.finishline = this.Bmap6.finishline;
        }
         if (n === 6) {
            this.startline = this.Bmap4.startline;
            this.challenge = this.Bmap4.challenge;
            this.finishline = this.Bmap4.finishline;
        }
        this.stage.addChild(this.challenge);
        this.stage.addChild(this.startline);
        this.stage.addChild(this.finishline);
        this.hero = game.hero;
        this.hero.pos(0, 300);
        this.stage.addChild(this.hero);
        this.stage.addChild(game.hero);
        this.stage.addChild(game.ctrl_rocker);
        this.stage.addChild(game.ctrl_rocker_move);
        this.stage.addChild(game.ctrl_back)
    }   
    course(): void {
        this.startcnt ++;
        if (this.coursenum === 1)
            course1(this);
        if (this.coursenum === 2)
            course5(this);
        if (this.coursenum === 3)
            course3(this);
        if (this.coursenum === 4)
            course2(this);
        if (this.coursenum === 5)
            course6(this);
        if (this.coursenum === 6)
            course4(this);
    }
    onfire(n:number): void {
            let m_tile: Tile = this.challenge.getChildAt(n) as Tile;
            m_tile.fire = true;
            for (let j: number = 0; j < m_tile.numChildren; j++) {
                 let _tile: Tile = m_tile.getChildAt(j) as Tile;
                 _tile.bomb.play(0, false);
                 Laya.SoundManager.playSound("res2/sound/bomb.wav",1);
            }//让第n块瓷砖炸弹爆炸
    }
    regame(): void {

        if (this.hero.alive === 0){
            for (let i: number = 0; i < this.stage.numChildren; i++) {
                    let m_child: Laya.Sprite = this.stage.getChildAt(i) as Laya.Sprite;
                    m_child.removeSelf();
            }
            for (let i: number = 0; i < this.numChildren; i++) {
                     let m_child: Laya.Sprite = this.getChildAt(i) as Laya.Sprite;
                     m_child.removeSelf();
            }
            revival++;
            Laya.SoundManager.playMusic("res/sound/bgm.mp3",0);
            if (mapnum === 0){
                let bg = new ThunderMode1();
                bg.setmap();
                this.hero.speedX = 0;
                this.hero.speedY = 0;
                this.hero.alive = 1;
                this.hero.burn.visible = false;
                this.hero.body.visible = false;
                this.timer.clear(this,this.judstate);
                this.timer.clear(this,this.course); 
                Laya.stage.addChild(bg);
            }
            else {
                let bg = new BombMode1();
                bg.setmap(mapnum);
                bg.coursenum = mapnum;
                this.hero.speedX = 0;
                this.hero.speedY = 0;
                this.hero.alive = 1;
                this.hero.burn.visible = false;
                this.hero.body.visible = false;
                this.timer.clear(this,this.judstate);
                this.timer.clear(this,this.course); 
                Laya.stage.addChild(bg);
            }
            
        }
    }
    judstate(): void {
        if(this.hero.alive === 0){
           this.rebutton.pos(400, 400);
           this.rebutton.width = 45;
           this.rebutton.height = 45;
           this.rebutton.loadImage("res2/regame.png");
           this.rebutton.on(Laya.Event.CLICK,this,this.regame);
           Laya.stage.addChild(this.rebutton);
        }//若死亡，那么停止爆炸
        let m_tile = this.finishline;
            if (this.hero.alive === 1) {
                if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height)) {
                
                    if(mapnum === 6){
                        for (let i: number = 0; i < this.stage.numChildren; i++) {
                            let m_child: Laya.Sprite = this.stage.getChildAt(i) as Laya.Sprite;
                            m_child.removeSelf();
                        }
                        for (let i: number = 0; i < this.numChildren; i++) {
                            let m_child: Laya.Sprite = this.getChildAt(i) as Laya.Sprite;
                            m_child.removeSelf();
                        }
                        this.hero.alive = 0;
                        this.timer.clear(this,this.judstate);
                        this.timer.clear(this,this.course);
                        let bg = new InputName();
                        Laya.stage.addChild(bg);
                    }
                    else{
                        for (let i: number = 0; i < this.stage.numChildren; i++) {
                            let m_child: Laya.Sprite = this.stage.getChildAt(i) as Laya.Sprite;
                            m_child.removeSelf();
                        } 
                          for (let i: number = 0; i < this.numChildren; i++) {
                            let m_child: Laya.Sprite = this.getChildAt(i) as Laya.Sprite;
                            m_child.removeSelf();
                        }
                        let bg = new BombMode1();
                        mapnum++;
                        bg.setmap(mapnum);
                        bg.coursenum = mapnum;
                        this.timer.clear(this,this.judstate);
                        this.timer.clear(this,this.course);
                        Laya.stage.addChild(bg);//如果角色到达了终点，则删除所有子节点与循环，进入下一个地图
                    }
                }    
            }
        if (this.hero.alive === 1) {
            let i: number = 0;
            let cnt: number = 0;
            for (i = 0; i < this.challenge.numChildren; i++) {
            let m_tile: Tile = this.challenge.getChildAt(i) as Tile;
                if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height))
                    break;

                cnt++;
            }
            let _tile: Tile = this.challenge.getChildAt(i) as Tile;
            if (cnt != this.challenge.numChildren) {
                if (_tile.fire === true && _tile.type != "5") {
                    DisplayWords(0);
                    this.hero.alive = 0;
                    makeunvisible(this.hero);
                    this.hero.burn.visible = true;
                    this.hero.burn.play(0,false);
                    Laya.SoundManager.playMusic("res/sound/gameover.wav",1);
                }
            }   //判断英雄是否被炸弹炸死
        }
        if (this.hero.alive === 1){
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
                } else {
                    if ((this.hero.x + 20 >= m_tile.posX && this.hero.x + 20 <= m_tile.posX + m_tile.width * 45 && 
                        this.hero.y + 23 >= m_tile.posY && this.hero.y + 23 <= m_tile.posY + 45 * m_tile.height))
                        break;

                    cnt++;
                }
            }
            if (cnt === this.stage.numChildren + this.challenge.numChildren - 4 && this.hero.alive === 1) {
                this.hero.alive = 0;
                Laya.SoundManager.playMusic("res/sound/fall.wav", 1);
                makeunvisible(this.hero);      
                this.hero.body.visible = true;
                this.hero.body.play(0,false);
                DisplayWords(0);
                if(this.hero.speedX < 0)
                this.hero.x -= 20;
                                    
                if(this.hero.speedY < 0)
                    this.hero.y -= 20;
                        
                if(this.hero.speedX > 0)
                    this.hero.x += 20;         
                
                if(this.hero.speedY > 0)
                    this.hero.y += 20;
            }//同上
        }     
    }
}

function DisplayWords(n: number): void {
        let w: number = 800;
        let offsetX: number = Laya.stage.width - w >> 1;
        let words: string;
        let letterText: Laya.Text;

        if(n === 0)
            words = "GameOver";
        for (let i: number = 0,len: number = words.length; i < len; ++i) {
            letterText = createLetter(words.charAt(i));
            letterText.x = w / len * i + offsetX;
            letterText.y = -200;
            Laya.Tween.to(letterText, { y: 100 }, 3000, Laya.Ease.elasticOut, null, i * 100);
        }
}
function createLetter(char: string): Laya.Text {
    let letter: Laya.Text = new Laya.Text();
    letter.text = char;
    letter.color = "#ffffff";
    letter.font = "Impact";
    letter.fontSize = 180;
    Laya.stage.addChild(letter);
    return letter;
}

function judelectricshock(hero: Hero,trap: Thunder){
    if(Math.abs(hero.x - trap.x) < 13 && Math.abs(hero.y - trap.y) < 30 && hero.alive === 1){//判断闪电碰撞
        hero.right.visible = false;
        hero.left.visible = false;
        hero.up.visible = false;
        hero.down.visible = false;
        hero.stand.visible = false;  
        hero.burn.visible = true;
        hero.burn.play(0,false);
        DisplayWords(0);
        Laya.SoundManager.playMusic("res/sound/thunder.wav",1);
        hero.alive = 0 ;        
    }
}
//炸弹爆炸规律
function course1(map:BombMode1){
        if(map.startcnt / 40 === 1){
            map.onfire(0);
        }
        if(map.startcnt / 65 === 1){
            map.onfire(1);
        }
        if(map.startcnt / 90 === 1){
            map.onfire(2);
        }
        if(map.startcnt / 115 === 1){
            map.onfire(3);
        }
        if(map.startcnt / 140 === 1){
            map.onfire(4);
        }
         if(map.startcnt / 165 === 1){
            map.onfire(5);
        }
         if(map.startcnt / 190 === 1){
            map.onfire(6);
        }
        if(map.startcnt / 215 === 1)
            map.startcnt = 0;
}

function course2(map:BombMode1){  
        if(map.startcnt / 40 === 1){
                map.onfire(0);
                map.onfire(1);
                map.onfire(2);
                map.onfire(3);
                map.onfire(4);
        }
        if(map.startcnt / 120 === 1)
            map.startcnt = 0;
}
function course3(map:BombMode1){
        if(map.startcnt / 40 === 1){
            map.onfire(0);
            map.onfire(12);
        }
        if(map.startcnt / 65 === 1){
            map.onfire(1);
            map.onfire(11);
        }
        if(map.startcnt / 90 === 1){
            map.onfire(2);
            map.onfire(10);
        }
        if(map.startcnt / 115 === 1){
            map.onfire(3);
            map.onfire(9);
        }
        if(map.startcnt / 140 === 1){
            map.onfire(4);
            map.onfire(8);
        }
        if(map.startcnt / 165 === 1){
            map.onfire(5);
            map.onfire(7);
        }
         if(map.startcnt / 250 === 1){
            map.onfire(6);
        }
        if(map.startcnt / 300 === 1)
            map.startcnt = 0;
}
function course4(map: BombMode1){

    if(map.startcnt / 40 === 1){
        map.onfire(0);
    }
    if(map.startcnt / 50 === 1){
        map.onfire(1);
    }
    if(map.startcnt / 60 === 1){
        map.onfire(2);
    }
    if(map.startcnt / 90 === 1){
        map.onfire(5);
    }
    if(map.startcnt / 100 === 1){
        map.onfire(4);
    }
    if(map.startcnt / 110 === 1){
        map.onfire(3);
    }
    if (map.startcnt / 170 === 1){
        map.onfire(0);
        map.onfire(2);
        map.onfire(4);
    }
    if (map.startcnt / 230 === 1){
        map.onfire(1);
        map.onfire(3);
        map.onfire(5);
    }
    if(map.startcnt / 290 === 1)
        map.startcnt = 0;   
}
function course5(map: BombMode1){
    if(map.startcnt / 40 === 1)
        map.onfire(0);
    if(map.startcnt / 100 === 1)
        map.onfire(1);
    if(map.startcnt / 150 === 1)
        map.startcnt = 0;
}
function course6(map: BombMode1){
    if (map.startcnt / 40 === 1){
        map.onfire(0);
        map.onfire(2);
        map.onfire(6);
        map.onfire(8);
    }
    if (map.startcnt / 80 === 1){
        map.onfire(1);
        map.onfire(7);
    }
    if (map.startcnt / 120 === 1){
        map.onfire(0);
        map.onfire(2);
        map.onfire(6);
        map.onfire(8);
    }
    if (map.startcnt / 160 === 1){
        map.onfire(1);
        map.onfire(3);
        map.onfire(4);
        map.onfire(5);
        map.onfire(7);
    }
    if (map.startcnt / 200 === 1){
        map.startcnt = 0;
    }
}
function makeunvisible(hero:Hero){
   hero.right.visible = false;
   hero.left.visible = false;
   hero.up.visible = false;
   hero.down.visible = false;
   hero.stand.visible = false;      
   hero.body.visible = false;
}
function DisplayRevival(){
    let Revtxt:Laya.Text = new Laya.Text();
    Revtxt.text = "Revival: " + revival;
    Revtxt.color = "#ffffff";
    Revtxt.font = "Impact";
    Revtxt.fontSize = 50;
    Revtxt.pos(0,0);
    Laya.stage.addChild(Revtxt);
}