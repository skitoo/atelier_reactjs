import React from 'react';
import FluxComponent from 'flummox/component';

class TaskList extends React.Component {
    render() {
        return (
            <ul>{
                this.props.tasks.map(task => <li>{task.name}</li>)
            }</ul>
        )
    }
}

class TaskForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.onFormSubmit}>
                <input type="text" name="name"></input>
                <button type="submit">Post</button>
            </form>
        )
    }
}

export default class App extends React.Component {
    componentDidMount() {
        this.props.flux.getActions('tasks').list();
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.flux.getActions('tasks').create();
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <FluxComponent flux={this.props.flux} connectToStores={['tasks']}>
                    <TaskList tasks={this.props.tasks} />
                    <TaskForm onFormSubmit={this.onFormSubmit.bind(this)} />
                </FluxComponent>
            </div>
        );
    }
}
