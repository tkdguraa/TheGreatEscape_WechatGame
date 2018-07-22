class StartBackGround extends Laya.Sprite{
    bgFirst:Laya.Sprite;
    bgSecond:Laya.Sprite;
    Play:Laya.Button;
    constructor(){
        super();
        this.init();
    }
    init(): void{
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

        Laya.timer.frameLoop(1,this,this.onLoop);
    }
    onLoop():void{
        this.bgFirst.x = this.bgFirst.x + 1;
        this.bgSecond.x = this.bgSecond.x + 1;
        if(this.bgFirst.x + this.x >= 800){
            this.bgFirst.x = this.bgFirst.x - 800*2;
        }
         if(this.bgSecond.x + this.x >= 800){
            this.bgSecond.x = this.bgSecond.x - 800*2;
        }
    }
       DisplayTitle():void{
         //字符串总宽度
        let w:number = 500;
        let w2:number = 300;
        
         //文本创建时的起始x位置
        let offsetX:number = Laya.stage.width - w >> 1;
        let offsetX2:number = Laya.stage.width - w2 >> 1;

        let title1:string = "The GReat";
        let title2:string = "Escape";
        let letterText:Laya.Text;
        
         //根据字符串长度创建单个字符，并对每个单独字符使用缓动动画
         for(let i:number = 0,len:number = title1.length;i<len;++i){
            letterText = this.createLetter(title1.charAt(i));
            letterText.x = w/len*i+offsetX;     
            letterText.y = 0;     
             /**
                 * 对象letterText属性y从100缓动到300的位置，每一帧都通过回调方法更新颜色
                 * 用1000毫秒完成缓动效果
                 * 缓动类型采用bounceIn
                 * 单个字符的缓动效果结束后，使用changeColor回调函数将字符改变为红色
                 * 延迟间隔i*100毫秒执行
                 */    
           Laya.Tween.to(letterText, { y : 100, update: new Laya.Handler(this, this.updateColor,[letterText])}, 1000, Laya.Ease.bounceIn, Laya.Handler.create(this,this.changeColor,[letterText]), 100);
        }
        for(let i:number = 0,len:number = title2.length;i<len;++i){
            letterText = this.createLetter(title2.charAt(i));
            letterText.x = w2/len*i+offsetX2;
            letterText.y = 0;
           Laya.Tween.to(letterText, { y : 200, update: new Laya.Handler(this, this.updateColor,[letterText])}, 1000, Laya.Ease.bounceIn, Laya.Handler.create(this,this.changeColor,[letterText]), 100);
        }
    }
    
    private updateColor(txt:Laya.Text):void{
        let c:number = Math.floor(Math.random()*3);
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
    private changeColor(txt:Laya.Text):void{
        txt.color = "#f9e3f3";
    }
    private createLetter(char:string):Laya.Text{
        let letter:Laya.Text = new Laya.Text();
        letter.text = char;
        letter.color = "#ffffff";
        letter.font = "Impact";
        letter.fontSize = 100;
        this.addChild(letter);
        return letter;
    }    
}

