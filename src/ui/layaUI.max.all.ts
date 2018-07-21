
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameStartUI extends View {
		public PlayBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":590,"height":332},"child":[{"type":"Button","props":{"y":20,"x":4,"width":221,"var":"PlayBtn","stateNum":1,"skin":"res/Play.png","rotation":0,"height":89}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameStartUI.uiView);

        }

    }
}
