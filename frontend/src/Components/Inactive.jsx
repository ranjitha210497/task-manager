import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { Box } from '@material-ui/core';
import Task from './Task';

function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" {...props} style={{color:"#6CC417", marginTop: "-6px"}}/>
        <Box
          top={-5}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="textSecondary" style={{fontSize: "10px", fontWeight: "600", position: "relative", left: "3px"}}>{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }


class Inactive extends React.Component {
    
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
                    task.progress == 0 ? (
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

export default Inactive