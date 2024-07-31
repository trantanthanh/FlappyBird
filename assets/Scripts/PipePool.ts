import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
    @property({
        type: Prefab
    }) prefabPipe = null;

    @property({
        type : Node
    }) pilePoolParent = null;

    @property({
        type: Node
    }) pilePoolSpawnParent = null;

    pool = new NodePool();

    POOL_MAX: number = 3;
    pipeSpawn;

    onLoad() {
        this.initPool();
    }

    initPool() {
        for (let i = 0; i < this.POOL_MAX; i++) {
            this.pipeSpawn = instantiate(this.prefabPipe);
            this.pipeSpawn.active = false;
            this.pool.put(this.pipeSpawn);
            this.pilePoolParent.addChild(this.pipeSpawn);
        }
    }

    respawnFromPool() {
        if (this.pool.size() > 0) {
            this.pipeSpawn = this.pool.get();
        }
        else {
            // console.log("Pool is empty");
            this.pipeSpawn = instantiate(this.prefabPipe);
        }

        this.pipeSpawn.active = true;
        this.pilePoolSpawnParent.addChild(this.pipeSpawn);
    }

    despawnToPool(node: Node) {
        node.active = false;
        this.pool.put(node);
        this.pilePoolParent.addChild(node);
    }

    reset() {
        for (let i = 0; i < this.pilePoolSpawnParent.children.length; i++) {
            this.despawnToPool(this.pilePoolSpawnParent.children[i]);
        }
    }
}


