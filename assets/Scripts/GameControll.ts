import { _decorator, Component, Node, CCInteger, input, Input, EventKeyboard, KeyCode } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
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
        type: CCInteger
    }) gameSpeed: number = 300;

    @property({
        type: CCInteger
    }) pipeSpeed: number = 200;

    onLoad() { 
        this.initListener();
    }
    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

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
        }
    }
    GameOver() {
        this.results.ShowResult();
    }

    onTouchMove(event: EventKeyboard) { }
}


