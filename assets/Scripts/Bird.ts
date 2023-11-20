import { _decorator, Component, Node, CCFloat, Vec3, Animation, tween } from 'cc';
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
    birdStartLocation: Vec3 = new Vec3(0, 0, 0);

    isFlapping: boolean = false;

    public hitSomething: boolean = false;
    onLoad() {
        // this.birdStartLocation = this.node.getPosition();
        this.resetBird();
        this.birdAnimation = this.getComponent(Animation);
    }
    resetBird() {
        this.node.setPosition(this.birdStartLocation);
        this.hitSomething = false;
    }

    fly() {
        this.isFlapping = true;
        this.birdAnimation.stop();

        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0), {
                easing: "smooth",
                onUpdate: (target: Vec3, ratio: number) => {
                    this.node.position = target;
                }
            })
            .call(() => {
                this.isFlapping = false;
            })
            .start();
        this.birdAnimation.play();
    }
}


