
export default class Timer {
    timer: number = 0;
    duration: number = 0;
    isDone: boolean = false;

    SetDuration(duration: number) {
        this.timer = this.duration = duration;
        this.isDone = false;
    }

    GetDuration(): number {
        return this.duration;
    }

    GetTimer(): number {
        return this.timer;
    }

    Reset() {
        this.timer = this.duration;
        this.isDone = false;
    }

    JustFinished(): boolean {
        if (this.timer > 0) {
            return false;
        }
        if (this.isDone) {
            return false;
        }
        this.isDone = true;
        return true;
    }

    IsDone(): boolean {
        return this.timer == 0;
    }

    Update(deltaTime: number) {
        if (this.timer > 0) {
            this.timer -= deltaTime;
            if (this.timer <= 0) {
                this.timer = 0;
            }
        }
    }

}
