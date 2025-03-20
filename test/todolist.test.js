const todolist = artifacts.require('./todolist.sol');

contract('todolist', (accounts) => {
    before(async () => {
        this.todolist = await todolist.deployed();
    })

    it('deploys successfully', async () => {
        const address = await this.todolist.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    }); 

    it('lists tasks', async () => {
        const taskCount = await this.todolist.taskCount();
        const task = await this.todolist.tasks(taskCount);
        assert.equal(task.id.toNumber(), taskCount.toNumber());
        assert.equal(task.content, 'Check out my Project');
        assert.equal(task.completed, false);
        assert.equal(taskCount.toNumber(), 1);
    });

    it('creates tasks', async () => {
        const result = await this.todolist.createtask('A new Task');
        const taskCount = await this.todolist.taskCount();
        assert.equal(taskCount, 2);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), 2);
        assert.equal(event.content, 'A new Task');
        assert.equal(event.completed, false);
    });

    it('toggles task completion', async () => {
        const result = await this.todolist.toggleCompleted(1);
        const task = await this.todolist.tasks(1);
        assert.equal(task.completed, true);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), 1);
        assert.equal(event.completed, true);
    })
});