class TaskRunner {
  constructor(concurrency) {
    // TODO
    this.concurrency = concurrency;
    this.priorityDic = {};
    this.queue = [];
    this.counter = 0;

    this.done = this.done.bind(this);
  }

  done() {
    this.counter--;

    if (Object.keys(this.priorityDic).length > 0) {
      this.executeTasks();
    }
    //delete test[0]
  }

  push(task, priority) {
    this.priorityDic[priority] = task;
    this.executeTasks(priority);
  }

  executeTasks() {
    if (this.counter < this.concurrency) {
      this.counter = this.counter++;
      console.log("this.counter", this.counter);
      console.log("this.priorityDic", this.priorityDic);

      const task = this.priorityDic[Object.keys(this.priorityDic)[0]];
      console.log("task", task);
      delete this.priorityDic[0];
      console.log("this.priorityDic", this.priorityDic);
      //task(this.done);
    }
  }
}

function exampleSimpleTaskCreate(id, priority) {
  return done => {
    console.log("start task ", id);
    done();
    // setTimeout(() => {
    //   console.log("end task ", id);
    //   done();
    // }, 1000);
  };
}

const r = new TaskRunner(3);
r.push(exampleSimpleTaskCreate(1), 1); // executes immediately
r.push(exampleSimpleTaskCreate(2), 2); // executes immediately
r.push(exampleSimpleTaskCreate(3), 5); // executes immediately
r.push(exampleSimpleTaskCreate(6), 6); // should wait until one of the running tasks completes
r.push(exampleSimpleTaskCreate(4), 3); // should wait until one of the running tasks completes
r.push(exampleSimpleTaskCreate(5), 4); // should wait until one of the running tasks completes
