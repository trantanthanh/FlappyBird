import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({
        type: Label,
        tooltip: 'this is current score'
    }) scoreLabel: Label;

    @property({
        type: Label,
        tooltip: 'this is high score'
    }) highScoreLabel: Label;

    @property({
        type: Label,
        tooltip: 'this is try again'
    }) tryAgain: Label;

    currentScore: number = 0;
    maxScore: number = 0;

    UpdateScore(score: number) {
        this.currentScore = score;
        this.scoreLabel.string = this.currentScore.toString();
    }

    ResetScore() {
        this.UpdateScore(0);
        this.HideResult();
    }

    AddScore() {
        this.UpdateScore(++this.currentScore);
    }

    ShowResult() {
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        this.highScoreLabel.string = 'High Score: ' + this.maxScore.toString();
        this.tryAgain.node.active = true;
        this.highScoreLabel.node.active = true;
    }

    HideResult() {
        this.tryAgain.node.active = false;
        this.highScoreLabel.node.active = false;
    }
}


