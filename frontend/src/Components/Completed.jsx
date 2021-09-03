import React from 'react';
import Task from './Task';


class Completed extends React.Component {
    
  constructor(props) {
      
    super(props);
        this.state = {
            tasks: props.tasks,
        }
}

componentDidMount() {
}

componentWillReceiveProps (nextProps) {
  this.setState({ tasks: nextProps.tasks });
}
    render() {
      const {tasks, originalTasks} = this.state;
        return(
            <div>
                 {this.state.tasks.map((task, i) => (
                    task.progress == 100 ? (
                            <Task 
                              task={task} 
                              color={this.props.color} 
                              editTitle={(id, title) => this.props.editTitle(id, title)}
                              editDescription={(id, description) => this.props.editDescription(id, description)}
                              updateProgress={(id, progress) => this.props.updateProgress(id, progress)}
                              addNote={(id, note) => this.props.addNote(id, note)}
                              deleteNote={(id, noteId) => this.props.deleteNote(id, noteId)}
                              deleteTask={(taskId) => this.props.deleteTask(taskId)}
                            /> 
                        ) : null
                ))}
            </div>
        )
    }
}

export default Completed