import { _decorator, Component, Node, Vec3, find, UITransform, screen } from 'cc';
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

    game;//instance of GameControll
    pipeSpeed: number = 10;
    scene = screen.windowSize;

    tempStartLocationTop: Vec3 = new Vec3(0, 0, 0);
    tempStartLocationBottom: Vec3 = new Vec3(0, 0, 0);
    onLoad() {
        this.game = find("GameControll").getComponent("GameControll");
        this.pipeSpeed = this.game.gameSpeed;
        this.initPos();
    }

    initPos() {
        this.tempStartLocationTop.x = this.topPipe.getComponent(UITransform).width + this.scene.width;
        this.tempStartLocationBottom.x = this.bottomPipe.getComponent(UITransform).width + this.scene.width;

        let gap = random(90, 100);
        let distanceHeight = random(0, 350);

        this.tempStartLocationTop.y = distanceHeight;
        this.tempStartLocationBottom.y = distanceHeight - gap;

        this.topPipe.setPosition(this.tempStartLocationTop);
        this.bottomPipe.setPosition(this.tempStartLocationBottom);
    }

    updatePos(deltaTime: number) {
        this.tempStartLocationTop.x -= this.pipeSpeed * deltaTime;
        this.tempStartLocationBottom.x -= this.pipeSpeed * deltaTime;

        this.topPipe.setPosition(this.tempStartLocationTop);
        this.bottomPipe.setPosition(this.tempStartLocationBottom);
    }

    update(deltaTime: number): void {
        this.updatePos(deltaTime);
    }
}


