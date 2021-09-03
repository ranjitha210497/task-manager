import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { Box } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Input } from '@material-ui/core';

function CircularProgressWithLabel(props) {
    const color = props.color
    console.log(color);
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" {...props} style={{color: `${color}`, marginTop: "-6px"}}/>
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


class Task extends React.Component {
    
    constructor(props) {
      
        super(props);
            this.state = {
                // originalTasks: JSON.parse(JSON.stringify(props.tasks)),
                task: props.task,
                titleEdit: { id: null, edit: false },
                descriptionEdit: { id: null, edit: false },
                addNote: { id: null, edit: false },
                progressEdit: {id: null, edit: false},
                note: "",
                progress: "",
                title: "",
                description: "",
            }
    }

    componentDidMount() {
      console.log(this.state);
    }
    render() {
      const {task} = this.state;
        return(
            <div>
                    <div>
                        <div className="p-4">
                            <div className="d-flex flex-row justify-content-between">
                                <p>
                                    <span className="gray" style={{fontSize: "20px"}}>Title:</span>
                                    <span className="ml-5">
                                      
                                      {this.state.titleEdit.id == task._id && this.state.titleEdit.edit ? (
                                          <>
                                            <Input 
                                            id="title"
                                            value={this.state.title} 
                                            autoFocus
                                            onBlur={() => {
                                              const titleEdit = {id: null, edit: false};
                                              setTimeout(() => {
                                                this.setState({ titleEdit });
                                              }, 300);
                                            } }
                                            onChange={(e) => {
                                              this.setState({ title: e.target.value });
                                            }}
                                            style={{fontSize: "20px"}}
                                            />
                                            <span> 
                                            <CheckCircleIcon 
                                              style={{width: "15px", position: "relative", top: "10px", left: "7px", cursor: "pointer", color: "green"}} 
                                              onClick={(e) => {
                                                this.props.editTitle(task._id, this.state.title)
                                              }}
                                            />
                                          </span>
                                          <span> 
                                            <CancelIcon 
                                              style={{width: "15px", position: "relative", top: "10px", left: "10px", cursor: "pointer", color: "red"}} 
                                              onClick={(e) => {
                                                this.setState({ title: ""});
                                              }}
                                            />
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <span style={{fontSize: "20px"}}>
                                            {task.title}
                                          </span>
                                        <EditOutlinedIcon  
                                          style={{width: "15px", position: "relative", top: "7px", left: "7px", cursor: "pointer"}} 
                                          onClick={() => {
                                            const titleEdit = {id: task._id, edit: true}
                                            this.setState({ titleEdit })
                                          }}
                                        />
                                        </>
                                      )}
                                    </span>
                                </p>
                                <p className="d-flex flex-row flex-end">
                                    <span className="gray">Progress:</span> 
                                  
                                  {this.state.progressEdit.id == task._id && this.state.progressEdit.edit ? (
                                      <span>
                                      <Input 
                                        id="progress"
                                        value={this.state.progress}
                                        autoFocus
                                        type="number"
                                        className="ml-5"
                                        style={{width: "50px", top: "-5px"}}
                                        onBlur={() => {
                                          const progressEdit = {id: null, edit: false};
                                          setTimeout(() => {
                                            this.setState({ progressEdit });
                                          }, 300);
                                        } }
                                        onChange={(e) => {
                                          this.setState({ progress: e.target.value})
                                        }}
                                        />
                                        <span> 
                                            <CheckCircleIcon 
                                              style={{width: "15px", position: "relative", top: "10px", left: "7px", cursor: "pointer", color: "green"}} 
                                              onClick={(e) => {
                                                this.props.updateProgress(task._id, 
                                                   parseFloat(this.state.progress));
                                              }}
                                            />
                                          </span>
                                          <span> 
                                            <CancelIcon 
                                              style={{width: "15px", position: "relative", top: "10px", left: "10px", cursor: "pointer", color: "red"}} 
                                              onClick={(e) => {
                                                let progressEdit = { id: null, edit: false};
                                                this.setState({ progressEdit, progress: ""});
                                              }}
                                            />
                                          </span>
                                      </span>
                                  ) : (
                                    <span>
                                      <CircularProgressWithLabel className="ml-5" value={task.progress} color={this.props.color} /> 
                                      <EditOutlinedIcon  
                                    style={{width: "15px", position: "relative", top: "-10px", left: "8px"}}
                                    onClick={() => {
                                      const progressEdit = {id: task._id, edit: true}
                                      this.setState({ progressEdit })
                                    }}
                                    /></span>
                                  )}
                                </p>
                            </div>
                            <p>
                            <span className="gray">Description:</span>
                                    <span className="ml-5">
                                      
                                      {this.state.descriptionEdit.id == task._id && this.state.descriptionEdit.edit ? (
                                          <>
                                            <Input 
                                            id="description"
                                            value={this.state.description} 
                                            autoFocus
                                            onBlur={() => {
                                              const descriptionEdit = {id: null, edit: false};
                                              setTimeout(() => {
                                                this.setState({ descriptionEdit });
                                              }, 300);
                                            } }
                                            onChange={(e) => {
                                              this.setState({ description: e.target.value });
                                            }}
                                            style={{width: "550px"}}
                                            />
                                            <span> 
                                            <CheckCircleIcon 
                                              style={{width: "15px", position: "relative", top: "10px", left: "7px", cursor: "pointer", color: "green"}} 
                                              onClick={(e) => {
                                                this.props.editDescription(task._id, 
                                                    this.state.description)
                                              }}
                                            />
                                          </span>
                                          <span> 
                                            <CancelIcon 
                                              style={{width: "15px", position: "relative", top: "10px", left: "10px", cursor: "pointer", color: "red"}} 
                                              onClick={(e) => {
                                                this.setState({ description: ""})
                                              }}
                                            />
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <span>
                                            {task.description}
                                          </span>
                                        <EditOutlinedIcon  
                                          style={{width: "15px", position: "relative", top: "7px", left: "7px", cursor: "pointer"}} 
                                          onClick={() => {
                                            const descriptionEdit = {id: task._id, edit: true}
                                            this.setState({ descriptionEdit })
                                          }}
                                        />
                                        </>
                                      )}
                                    </span>
                            </p>
                                
                              <p ><span className="gray">Notes</span>
                                  <span>
                                    <AddCircleOutlineIcon 
                                      style={{width: "15px", position: "relative", top: "7px", left: "7px", cursor: "pointer"}} 
                                      onClick={() => {
                                        const addNote = { id: task._id, edit: true};
                                        this.setState({ addNote });
                                      }}
                                    />
                                  </span></p>
                                <div className="pl-1">
                                  {task.notes.map((note, i) => (
                                    <p><span className="gray">Note {i+1}:</span> {note.note} <span>
                                        <DeleteOutlinedIcon 
                                            style={{width: "15px", position: "relative", top: "7px", left: "7px", color: "red",cursor: "pointer"}}
                                            onClick={(e) => {
                                                this.props.deleteNote(task._id, note._id);
                                            }}
                                        />
                                        </span>
                                    </p>
                                  ))}
                                  {this.state.addNote.id == task._id && this.state.addNote.edit && (
                                      <p>
                                      <span className="gray">Note {task.notes.length + 1}:</span>
                                          <Input
                                              className="ml-5" 
                                              id="notes"
                                              value={this.state.note} 
                                              autoFocus
                                              onBlur={() => {
                                                const addNote = {id: null, edit: false};
                                                setTimeout(() => {
                                                  this.setState({ addNote });
                                                }, 300);
                                              } }
                                              onChange={(e) => {
                                                this.setState({ note: e.target.value });
                                              }}
                                              style={{width: "500px"}}
                                              />
                                          <span>
                                          <span> 
                                              <CheckCircleIcon 
                                                style={{width: "15px", position: "relative", top: "10px", left: "7px", cursor: "pointer", color: "green"}} 
                                                onClick={(e) => {
                                                    this.props.addNote(task._id, 
                                                        this.state.note);
                                                   }}
                                              />
                                            </span>
                                            <span> 
                                              <CancelIcon 
                                                style={{width: "15px", position: "relative", top: "10px", left: "10px", cursor: "pointer", color: "red"}} 
                                                onClick={(e) => {
                                                  this.setState({ addNote: false, note: ""})
                                                }}
                                              />
                                            </span>
                                        </span></p>
                                  )}
                                </div>
                                <div className="d-flex flex-column">
                                    <button className="d-flex flex-end create" onClick={() => this.props.deleteTask(task._id)} >
                                        Delete Task 
                                        <DeleteOutlinedIcon className="ml-5" style={{color: "red", width: "20px"}} />
                                    </button>
                                </div>
                                
                        </div>
                        <hr />
                    </div>
            </div>
        )
    }
}

export default Task;