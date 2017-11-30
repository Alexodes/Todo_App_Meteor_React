import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Task from './Task';
import { Tasks } from '../api/tasks.js';
// App component represents the whole app
class App extends Component {
    handleSubmit(event){
        event.preventDefault();
        // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    
       Tasks.insert({
         text,
         createdAt: new Date(), // current time
       });
    
       // Clear form
       ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    getTasks() {
        return [
            {_id: 1, text: 'This is task 1'},
            {_id: 2, text: 'This is task 2'},
            {_id: 3, text: 'This is task 3'}
        ];
    }

    renderTasks() {
        return this.props.tasks.map((task) => (
              <Task key={task._id} task={task}/>  
        ));
    }

    render() {
        const title = "Meteor-React Todo List"
        return (
            <div className="container">
                <header>
                    <h1>{title}</h1>

                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                        <input 
                            type="text"
                            ref="textInput"
                            placeholder="Type to add a new tasks"
                        />
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        )
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(App);