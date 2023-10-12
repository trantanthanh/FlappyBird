import { _decorator, Component, Node, Vec3, UITransform, director, Canvas } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: Node,
        tooltip: 'ground1 is here'
    }) ground1: Node;

    @property({
        type: Node,
        tooltip: 'ground2 is here'
    }) ground2: Node;

    @property({
        type: Node,
        tooltip: 'ground3 is here'
    }) ground3: Node;

    groundWith1: number;
    groundWith2: number;
    groundWith3: number;
    tempStartLocation1 = new Vec3;
    tempStartLocation2 = new Vec3;
    tempStartLocation3 = new Vec3;
    gameSpeed: number = 200;

    onLoad() {
        this.startUp();
    }

    startUp() {
        const scene = director.getScene();
        const canvasWidth = scene.getComponentInChildren(Canvas).getComponent(UITransform).width;

        this.groundWith1 = this.ground1.getComponent(UITransform).width;
        this.groundWith2 = this.ground2.getComponent(UITransform).width;
        this.groundWith3 = this.ground3.getComponent(UITransform).width;

        this.tempStartLocation1.x = -canvasWidth / 2;
        this.tempStartLocation2.x = this.tempStartLocation1.x + this.groundWith1;
        this.tempStartLocation3.x = this.tempStartLocation2.x + this.groundWith2;
        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }

    UpdateRollBg(deltaTime: number) {
        const scene = director.getScene();
        const canvasWidth = scene.getComponentInChildren(Canvas).getComponent(UITransform).width;
        var deltaMove: number = this.gameSpeed * deltaTime;
        this.tempStartLocation1.x -= deltaMove;
        this.tempStartLocation2.x -= deltaMove;
        this.tempStartLocation3.x -= deltaMove;

        if (this.tempStartLocation1.x <= -canvasWidth / 2 - this.groundWith1) {
            this.tempStartLocation1.x = this.tempStartLocation3.x + this.groundWith3;
        }
        if (this.tempStartLocation2.x <= -canvasWidth / 2 - this.groundWith2) {
            this.tempStartLocation2.x = this.tempStartLocation1.x + this.groundWith1;
        }
        if (this.tempStartLocation3.x <= -canvasWidth / 2 - this.groundWith3) {
            this.tempStartLocation3.x = this.tempStartLocation2.x + this.groundWith2;
        }

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
        // this.ground1.setPosition(this.ground1.position.x - deltaMove, this.ground1.position.y, this.ground1.position.z);
        // this.ground2.setPosition(this.ground2.position.x - deltaMove, this.ground2.position.y, this.ground2.position.z);
        // this.ground3.setPosition(this.ground3.position.x - deltaMove, this.ground3.position.y, this.ground3.position.z);
    }

    update(deltaTime: number): void {
        this.UpdateRollBg(deltaTime);
    }
}


