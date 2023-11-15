import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;
import { Pipes } from './Pipes';

@ccclass('PipePool')
export class PipePool extends Component {
    @property({
        type: Prefab
    }) prefabPipe = null;

    @property({
        type: Node
    }) pilePoolHome = null;

    pool = new NodePool;

    POOL_MAX: number = 3;

    onLoad() {
        this.initPool();
    }

    initPool() {
        for (let i = 0; i < this.POOL_MAX; i++) {
            let pipe = instantiate(this.prefabPipe);
            if (i == 0) {
                this.pilePoolHome.addChild(pipe)
            }
            else {
                this.pool.put(pipe);
            }
        }
    }

    addPool() {

    }

    resetPool() {

    }
}


