import{Actions, Store, Flummox} from 'flummox'

export class TaskAction extends Actions {

    list(){
        return fetch('http://localhost:8000/task/', {
            headers: {}
        }).then( res => {
            return res.json();
        });
    }

    create(){
        return fetch('http://localhost:8000/task/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                owner: 'skitoo',
                categories: ['Perso'],
                name: event.target.name.value
            })
        }).then(res => res.json());
    }
}

export class TaskStore extends Store {

    state = {tasks: []}

    constructor(flux) {
        super();
        const taskActionIds = flux.getActionIds('tasks');
        this.register(taskActionIds.list, this.handleListTasks);
        this.register(taskActionIds.create, this.handleCreateTask);
    }

    handleListTasks(tasks) {
        this.setState({tasks: tasks});
    }

    handleCreateTask(task) {
        this.setState({tasks: this.state.tasks.concat(task)});
    }
}


export class AppFlux extends Flummox {
    constructor() {
        super();
        this.createActions('tasks', TaskAction);
        this.createStore('tasks', TaskStore, this);
    }
}
