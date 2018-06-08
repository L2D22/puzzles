class TaskRunner {
    constructor(concurrency) {
        // TODO
        this.concurrency = concurrency;
        this.queue = [];
        this.counter = 0;

        this.done = this.done.bind(this);
    }

    done() {
        this.counter--;
        if(this.queue.length > 0) {
            this.executeTasks();
        }
    }

    push(task) {
        // TODO
        this.queue.push(task);
        this.executeTasks();
    }

    executeTasks() {
        if(this.counter < this.concurrency) {
            this.counter++;
            const task = this.queue.shift();
            task(this.done);
        }
    }
}

function exampleTask(done) { /* calls done() at some point */ }

function exampleSimpleTaskCreate(id) {
    return (done) => {
        console.log('start task ', id );
        setTimeout(() => {
            console.log('end task ', id );
            done();
        }, 1000);
    };
}

function exampleXhrTask(done) {
    makeARequestSomehow('http://website.api/foo', function (err, res) {
        doSomethingWithRes(res);
        done();
    });
}

const r = new TaskRunner(3);
r.push(exampleSimpleTaskCreate(1)); // executes immediately
r.push(exampleSimpleTaskCreate(2)); // executes immediately
r.push(exampleSimpleTaskCreate(3)); // executes immediately
r.push(exampleSimpleTaskCreate(4)); // should wait until one of the running tasks completes
r.push(exampleSimpleTaskCreate(5)); // should wait until one of the running tasks completes
