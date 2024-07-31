import { _decorator, Component, Node, Vec3, find, UITransform, screen, director, Canvas } from 'cc';
import { GameControl } from './GameControl';
const { ccclass, property } = _decorator;

const random = (min, max) => { return Math.random() * (max - min) + min };

@ccclass('Pipes')
export class Pipes extends Component {
    @property({
        type: Node,
        tooltip: 'top pipe'
    }) topPipe: Node;
    @property({
        type: Node,
        tooltip: 'bottom pipe'
    }) bottomPipe: Node;



    game;//instance of GameControl
    pipeSpeed: number = 10;
    scene = screen.windowSize;
    isPass: boolean = false;

    tempStartLocationTop: Vec3 = new Vec3(0, 0, 0);
    tempStartLocationBottom: Vec3 = new Vec3(0, 0, 0);
    onLoad() {
        this.game = find("GameControl").getComponent("GameControl");
    }

    onEnable(){
        this.pipeSpeed = this.game.pipeSpeed;
        this.isPass = false;
        this.initPos();
    }

    initPos() {
        this.node.setPosition(this.getComponent(UITransform).width + this.scene.width, this.node.getPosition().y);
        
        let gap = this.game.getVariableGap();
        let distanceHeight = random(0, 350);

        this.tempStartLocationTop.y = distanceHeight;
        this.tempStartLocationBottom.y = distanceHeight - gap;

        this.topPipe.setPosition(this.tempStartLocationTop);
        this.bottomPipe.setPosition(this.tempStartLocationBottom);
    }

    updatePos(deltaTime: number) {
        this.node.setPosition(this.node.getPosition().x - this.pipeSpeed * deltaTime, this.node.getPosition().y);
    }

    update(deltaTime: number): void {
        this.updatePos(deltaTime);
        if (!this.isPass && this.node.getPosition().x <= 0) {
            this.isPass = true;
            this.game.passPipe();
        }
        else if (this.node.getPosition().x <= -this.scene.width) {
            this.game.finishPipe(this.node);
        }
    }
}


