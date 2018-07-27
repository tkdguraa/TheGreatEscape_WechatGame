class Thunder extends Laya.Sprite {
    public speed: number;

    constructor() {
        super();  
    }

    public init(_speed: number): void {
        this.loadImage("res/thunder.png");
        this.speed = _speed; 
    }
}
