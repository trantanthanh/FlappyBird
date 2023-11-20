import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;

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
    pipeSpawn;

    onLoad() {
        this.initPool();
    }

    initPool() {
        for (let i = 0; i < this.POOL_MAX; i++) {
            this.pipeSpawn = instantiate(this.prefabPipe);
            this.pool.put(this.pipeSpawn);
        }
    }

    addPool() {
        if (this.pool.size() > 0) {
            this.pipeSpawn = this.pool.get();
        }
        else {
            this.pipeSpawn = instantiate(this.prefabPipe);
        }

        this.pilePoolHome.addChild(this.pipeSpawn);
    }

    reset() {
        this.pilePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}


