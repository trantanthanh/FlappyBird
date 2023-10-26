import { _decorator, Component, Node, CCInteger } from 'cc';
import { Ground } from './Ground';
const { ccclass, property } = _decorator;

@ccclass('GameControll')
export class GameControll extends Component {
    @property({
        type: Ground
    }) ground: Ground;

    @property({
        type: CCInteger
    }) gameSpeed: number = 300;

    @property({
        type: CCInteger
    }) pipeSpeed: number = 200;

    onLoad() { }
    initListener() { }
}


