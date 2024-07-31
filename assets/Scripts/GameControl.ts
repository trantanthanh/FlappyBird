import {
    _decorator, Component, Node, CCInteger, input, Input, EventKeyboard, KeyCode, director, CCFloat,
    Contact2DType, Collider2D, IPhysics2DContact
} from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { BirdAudio } from "./BirdAudio";
import Timer from './Timer';

const random = (min, max) => { return Math.random() * (max - min) + min };

const { ccclass, property } = _decorator;

enum AudioIndex {
    FLAP,
    POINT,
    HIT,
    DIE,
    WING
};

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
        type: CCFloat,
        range: [0, 100],
        slide: true,
        tooltip: 'variable gap of pipe',
    }) gapOfPipeVariable: number = 30;

    @property({
        type: PipePool
    }) pipePool: PipePool;

    @property({
        type: BirdAudio
    }) birdAudio: BirdAudio;

    isGameOver: boolean = false;

    timerIntSpawnPipe: Timer = new Timer();
    @property(
        {
            type: CCFloat,
            tooltip: 'time interval to spawn pipe'
        }
    ) timeIntervalSpawnPipe: number = 0.5;

    @property({
        type: CCFloat,
        range: [0, 3],
        slide: true,
        tooltip: "time variable to spawn pipe"
    })
    timeVariableSpawnPipe: number = 0.1;

    onLoad() {
        this.initListener();
        this.isGameOver = true;
        this.results.ResetScore();
        this.results.HideResult();
        director.pause();
        this.timerIntSpawnPipe.SetDuration(0);//for first spawn immediately
    }
    initListener() {
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            if (this.isGameOver) {
                this.resetGame();
            }
            else {
                if (!this.bird.isFlapping) {
                    this.bird.fly();
                    this.birdAudio.onAudioQueue(AudioIndex.WING);
                }
            }
        })
    }

    getVariableGap():number {
        return this.gapOfPipe + (random(0, 1) < 0.5 ? -1 : 1) * random(0, this.gapOfPipeVariable);
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
        this.pipePool.reset();
        this.startGame();
    }

    startGame() {
        this.results.HideResult();
        director.resume();
    }

    passPipe() {
        this.birdAudio.onAudioQueue(AudioIndex.POINT);
        this.results.AddScore();
    }

    createPipe() {
        this.pipePool.respawnFromPool();
    }

    finishPipe(node : Node)
    {
        this.pipePool.despawnToPool(node);
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
        this.birdAudio.onAudioQueue(AudioIndex.HIT);
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

            this.timerIntSpawnPipe.Update(deltaTime);
            if (this.timerIntSpawnPipe.JustFinished()) {
                this.timerIntSpawnPipe.SetDuration(this.timeIntervalSpawnPipe + (random(0, 1) < 0.5 ? -1 : 1) * random(0, this.timeVariableSpawnPipe));
                this.createPipe();
            }
        }
    }
}


