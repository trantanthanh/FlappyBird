import {
    _decorator, Component, Node, CCInteger, input, Input, EventKeyboard, KeyCode, director, CCFloat,
    Contact2DType, Collider2D, IPhysics2DContact
} from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {
    @property({
        type: Ground
    }) ground: Ground;

    @property({
        type: Results,
        tooltip: "this is results"
    }) results: Results;

    @property({
        type: Bird,
        tooltip: "this is bird"
    }) bird: Bird;

    @property({
        type: CCInteger
    }) gameSpeed: number = 300;

    @property({
        type: CCInteger
    }) pipeSpeed: number = 200;

    @property({
        type: CCFloat
    }) gapOfPipe: number = 100;

    @property({
        type: PipePool
    }) pipeQueue: PipePool;

    isGameOver: boolean = false;

    onLoad() {
        this.initListener();
        this.isGameOver = true;
        this.results.ResetScore();
        this.results.HideResult();
        director.pause();
    }
    initListener() {
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            if (this.isGameOver) {
                this.resetGame();
            }
            else {
                this.bird.fly();
            }
        })
    }

    //for testing case
    // onKeyDown(event: EventKeyboard) {
    //     switch (event.keyCode) {
    //         case KeyCode.KEY_A:
    //             {
    //                 this.GameOver();
    //                 break;
    //             }
    //         case KeyCode.KEY_P:
    //             {
    //                 this.results.AddScore();
    //                 break;
    //             }
    //         case KeyCode.KEY_R:
    //             {
    //                 this.resetGame();
    //                 break;
    //             }
    //     }
    // }

    resetGame() {
        this.isGameOver = false;
        this.results.ResetScore();
        this.bird.resetBird();
        this.pipeQueue.reset();
        this.startGame();
    }

    startGame() {
        this.results.HideResult();
        director.resume();
    }

    passPipe() {
        this.results.AddScore();
    }

    createPipe() {
        this.pipeQueue.addPool();
    }

    GameOver() {
        this.isGameOver = true;
        this.results.ShowResult();
        director.pause();
    }

    contactGroundPipe() {
        let birdCollider = this.bird.getComponent(Collider2D);

        birdCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.bird.hitSomething = true;
    }

    birdStruck() {
        this.contactGroundPipe();
        if (this.bird.hitSomething) {
            this.GameOver();
        }
    }

    update(deltaTime: number) {
        if (!this.isGameOver) {
            this.birdStruck();
        }
    }
}


