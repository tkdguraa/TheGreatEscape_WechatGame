class Thunder extends Laya.Sprite {
    public speed: number;

    constructor() {
        super();  
    }

    public init(_speed: number): void {
        this.loadImage("res2/thunder.png");
        this.speed = _speed; 
    }
}
