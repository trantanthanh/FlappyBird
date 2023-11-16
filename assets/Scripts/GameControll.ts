import { _decorator, Component, Node, CCInteger, input, Input, EventKeyboard, KeyCode, director, CCFloat } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
const { ccclass, property } = _decorator;

@ccclass('GameControll')
export class GameControll extends Component {
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

    onLoad() {
        this.initListener();
        this.results.ResetScore();
        this.results.HideResult();
        director.pause();
    }
    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            this.bird.fly();
        })
    }

    //for testing case
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                {
                    this.GameOver();
                    break;
                }
            case KeyCode.KEY_P:
                {
                    this.results.AddScore();
                    break;
                }
            case KeyCode.KEY_R:
                {
                    this.results.ResetScore();
                    this.bird.resetBird();
                    this.startGame();
                    break;
                }
        }
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
        this.results.ShowResult();
        director.pause();
    }

}


