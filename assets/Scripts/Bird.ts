import { _decorator, Component, Node, CCFloat, Vec3, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    @property({
        type: CCFloat,
        tooltip: "how height can bird fly"
    }) jumpHeight: number = 3.5;

    @property({
        type: CCFloat,
        tooltip: "how long can bird jump"
    }) jumpDuration: number = 2;

    birdAnimation: Animation;
    birdStartLocation: Vec3 = new Vec3(0, 0 , 0);
    onLoad() {
        this.birdStartLocation = this.node.getPosition();
        this.resetBird();
        this.birdAnimation = this.getComponent(Animation);
    }
    resetBird() {
        this.node.setPosition(this.birdStartLocation);
    }
}


