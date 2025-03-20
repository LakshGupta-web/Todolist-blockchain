const App = {
    contracts: {},
    loading: false,
    
    load: async () => {
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
        await App.listenForEvents();  
    },

    loadWeb3: async () => {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            App.web3 = new Web3(App.web3Provider);
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
            } catch (error) {
                console.error("User denied account access:", error);
            }
        } else {
            console.log("Non-Ethereum browser detected. Please install MetaMask!");
        }
    },
    
    loadAccount: async () => {
        const accounts = await App.web3.eth.getAccounts();
        App.account = accounts[0];
    },

    loadContract: async () => {
        const response = await fetch("todolist.json");  
        const todolist = await response.json();
        App.contracts.todolist = TruffleContract(todolist);  
        App.contracts.todolist.setProvider(App.web3Provider);
        
        App.todolist = await App.contracts.todolist.deployed();
    },

    listenForEvents: async () => {
        App.todolist.contract.events.TaskCreated({ fromBlock: "latest" })
            .on("data", async (event) => {  
                console.log("New Task Created:", event.returnValues);
                await App.renderTasks();
            })
            .on("error", (error) => {
                console.error("Error listening to TaskCreated event:", error);
            });
    },    

    render: async () => {
        if (App.loading) return;

        App.setLoading(true);

        $("#account").html(App.account);
        await App.renderTasks();

        App.setLoading(false);
    },

    renderTasks: async () => {
        const taskCount = (await App.todolist.taskCount()).toNumber();
        const $taskTemplate = $(".taskTemplate");

        $("#taskList").empty();
        $("#completedTaskList").empty();
    
        for (let i = 1; i <= taskCount; i++) {
            const task = await App.todolist.tasks(i);
            const taskId = task[0].toNumber();
            const taskContent = task[1];
            const taskCompleted = task[2];

            const $newTaskTemplate = $taskTemplate.clone();
            $newTaskTemplate.find(".content").html(taskContent);
            $newTaskTemplate.find("input").prop("name", taskId).prop("checked", taskCompleted).on('click', App.toggleCompleted);
    
            if (taskCompleted) {
                $("#completedTaskList").append($newTaskTemplate);
            } else {
                $("#taskList").append($newTaskTemplate);
            }

            $newTaskTemplate.show();
        }
    },

    createTask: async () => {
        App.setLoading(true);
        const content = $("#newTask").val().trim();
    
        if (!content) {
            console.error("Task content cannot be empty!");
            App.setLoading(false);
            return;
        }

        try {
            await App.todolist.createtask(content, { from: App.account });

            console.log("Transaction sent. Waiting for confirmation...");
            
            $("#newTask").val("");  
            window.location.reload();
        } catch (error) {
            console.error("Task creation failed:", error);
        }

        App.setLoading(false);
    },

    toggleCompleted: async (event) => {
        App.setLoading(true);
        const taskId = parseInt(event.target.name);
    
        try {
            await App.todolist.toggleCompleted(taskId, { from: App.account });
    
            console.log(`Task ${taskId} marked as completed/incomplete.`);
            
            window.location.reload();
        } catch (error) {
            console.error(`Task completion failed for task ID ${taskId}:`, error);
        }
    
        App.setLoading(false);
    },
    

    setLoading: (boolean) => {
        App.loading = boolean;
        const loader = $("#loader");
        const content = $("#content");

        if (boolean) {
            loader.show();
            content.hide();
        } else {
            loader.hide();
            content.show();
        }
    }
};

window.addEventListener("load", () => {
    App.load();
});
