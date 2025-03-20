pragma solidity ^0.5.0;

contract todolist {
    uint public taskCount = 0;

    struct task {
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => task) public tasks;

    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    event TaskCompleted(
        uint id,
        bool completed
    );

    constructor() public{
        createtask("Check out my Project");
    }

    function createtask(string memory _content) public{
        taskCount ++;
        tasks[taskCount] = task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleCompleted(uint _id) public {
        task storage _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }
}