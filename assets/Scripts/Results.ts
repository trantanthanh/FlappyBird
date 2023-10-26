import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({
        type: Label,
        tooltip: 'this is current score'
    }) currentScore: Label;

    @property({
        type: Label,
        tooltip: 'this is high score'
    }) highScore: Label;

    @property({
        type : Label,
        tooltip : 'this is try again'
    }) tryAgain : Label;
}


