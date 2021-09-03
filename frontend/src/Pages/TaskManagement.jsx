import React from 'react';
import Active from '../Components/Active';
import Completed from '../Components/Completed';
import Inactive from '../Components/Inactive';
import  Modal  from '../Components/Modal/Modal';
import  Backdrop  from '../Components/Backdrop/Backdrop';
import AddIcon from '@material-ui/icons/Add';


class TaskManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectedStatus: 'inactive',
            isLoading: true,
            tasks: [],
            createTask: false,
        }
        this.titleElRef = React.createRef();
        this.descriptionElRef = React.createRef();
    }
    

    componentWillMount() {
        this.fetchTasks();
    }

    fetchTasks = () => {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
                    query {
                        tasks {
                            _id
                           title
                           description
                           progress
                           notes {
                               _id
                               note
                           }
                        }
                    }
                `
        }
        
        fetch('http://localhost:8000/graphql', 
        {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json',
            }
        }).then( res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        })
        .then(resData => {
           this.setState({ tasks: resData.data.tasks });
        })
        .catch(err => {
            this.setState({ isLoading: false});
        });
    } 

    editTitle = (id, title) => {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
                    mutation EditTitle($taskId: ID!, $title: String!) {
                        editTitle(taskId: $taskId, title: $title) {
                            title
                            description
                            progress
                            notes {
                            _id
                             note
                            }
                        }
                    }
                `
            ,
            variables: {
                taskId: id,
                title: title
            }
        }
        
        fetch('http://localhost:8000/graphql', 
        {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json',
            }
        }).then( res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        })
        .then(resData => {
           let { tasks } = this.state;
           tasks.map((task, i) => {
                if(task._id == id) {
                    tasks[i].title = resData.data.editTitle.title
                }
           })
           this.setState({ tasks });
        })
        .catch(err => {
            this.setState({ isLoading: false});
        });
    }

    editDescription = (id, description) => {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
                    mutation EditDescription($taskId: ID!, $description: String!) {
                        editDescription(taskId: $taskId, description: $description) {
                            title
                            description
                            progress
                            notes {
                            _id
                             note
                            }
                        }
                    }
                `
            ,
            variables: {
                taskId: id,
                description: description
            }
        }
        
        fetch('http://localhost:8000/graphql', 
        {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json',
            }
        }).then( res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        })
        .then(resData => {
           let { tasks } = this.state;
           tasks.map((task, i) => {
                if(task._id == id) {
                    tasks[i].description = resData.data.editDescription.description
                }
           })
           this.setState({ tasks });
        })
        .catch(err => {
            this.setState({ isLoading: false});
        });
    }

    updateProgress = (id, progress) => {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
                    mutation UpdateProgress($taskId: ID!, $progress: Float!) {
                        updateProgress(taskId: $taskId, progress: $progress) {
                            title
                            description
                            progress
                            notes {
                            _id
                             note
                            }
                        }
                    }
                `
            ,
            variables: {
                taskId: id,
                progress: progress
            }
        }
        
        fetch('http://localhost:8000/graphql', 
        {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json',
            }
        }).then( res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        })
        .then(resData => {
           let { tasks } = this.state;
           tasks.map((task, i) => {
                if(task._id == id) {
                    tasks[i].progress = resData.data.updateProgress.progress
                }
           })
           this.setState({ tasks });
        })
        .catch(err => {
            this.setState({ isLoading: false});
        });
    }

    addNote = (id, note) => {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
                    mutation AddNote($taskId: ID!, $note: String!) {
                        addNote(taskId: $taskId, note: $note) {
                            title
                            description
                            progress
                            notes {
                            _id
                             note
                            }
                            totalNotesAdded
                        }
                    }
                `
            ,
            variables: {
                taskId: id,
                note: note
            }
        }
        
        fetch('http://localhost:8000/graphql', 
        {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json',
            }
        }).then( res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
           let { tasks } = this.state;
           tasks.map((task, i) => {
                if(task._id == id) {
                    const notes = resData.data.addNote.notes;
                    const length = resData.data.addNote.notes.length - 1;
                    tasks[i].notes.push(notes[length]) 
                }
           })
           this.setState({ tasks });
        })
        .catch(err => {
            this.setState({ isLoading: false});
        });
    }

    deleteNote = (id, noteId) => {
        this.setState({isLoading: true});
        const requestBody = {
            query: `
                    mutation DeleteNote($taskId: ID!, $noteId: ID!) {
                        deleteNote(taskId: $taskId, noteId: $noteId) {
                            title
                            description
                            progress
                            notes {
                            _id
                             note
                            }
                            totalNotesAdded
                        }
                    }
                `
            ,
            variables: {
                taskId: id,
                noteId: noteId
            }
        }
        
        fetch('http://localhost:8000/graphql', 
        {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json',
            }
        }).then( res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        })
        .then(resData => {
           let { tasks } = this.state;
           tasks.map((task, i) => {
                if(task._id == id) {
                    const notes = resData.data.deleteNote.notes;
                    console.log(notes);
                    tasks[i].notes = notes
                }
           })
           this.setState({ tasks });
        })
        .catch(err => {
            this.setState({ isLoading: false});
        });
    }

    createTask = () => {
        this.setState({isLoading: true, createTask: false});
        const requestBody = {
            query: `
                    mutation CreateTask($title: String!, $description: String!) {
                        createTask(taskInput: {title: $title, description: $description}) {
                            _id
                            title
                            description
                            progress
                            notes {
                            _id
                             note
                            }
                            totalNotesAdded
                        }
                    }
                `
            ,
            variables: {
                title: this.titleElRef.current.value,
                description: this.descriptionElRef.current.value,
            }
        }
        
        fetch('http://localhost:8000/graphql', 
        {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json',
            }
        }).then( res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData)
           let { tasks } = this.state;
            tasks.push(resData.data.createTask)
           this.setState({ tasks });
        })
        .catch(err => {
            this.setState({ isLoading: false});
        });
    }

    cancelCreateTask = () => {
        this.titleElRef.current.value = ""
        this.descriptionElRef.current.value = ""
        this.setState({ createTask: false})
    }

    deleteTask = (taskId) => {
        console.log(taskId);
        this.setState({isLoading: true });
        const requestBody = {
            query: `
                    mutation DeleteTask($taskId: ID!) {
                        deleteTask(taskId: $taskId ) {
                            _id
                            title
                            description
                            progress
                            notes {
                            _id
                             note
                            }
                            totalNotesAdded
                        }
                    }
                `
            ,
            variables: {
               taskId: taskId
            }
        }
        
        fetch('http://localhost:8000/graphql', 
        {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json',
            }
        }).then( res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json();
        })
        .then(resData => {
           let { tasks } = this.state;
           const id = resData.data.deleteTask._id;
           function checkForTask(task) {
               return task._id !== id
           }
           tasks = tasks.filter(checkForTask);
           this.setState({ tasks });
        })
        .catch(err => {
            this.setState({ isLoading: false});
        });
    }


    render() {
        return(
            <div className="d-flex flex-column">
                <button className="d-flex flex-end create" 
                onClick={() => this.setState({createTask: true})} >Create Task <AddIcon className="ml-5" /></button>
                {this.state.createTask && (
                    <>
                        <Backdrop />
                        <Modal 
                            title="Create Task" 
                            canCancel 
                            canConfirm
                            onCancel={this.cancelCreateTask}
                            onConfirm={this.createTask}
                            confirmText="Create"
                        >
                            <form>
                                <div className="form-control">
                                    <label htmlFor="title">Title: </label>
                                    <input type="text" className="ml-5" id="title" ref={this.titleElRef} style={{width: "350px"}}></input>
                                </div>
                                <div className="form-control mt-3">
                                    <label htmlFor="description">Description: </label>
                                    <textarea id="description" className="ml-5" rows="4" ref={this.descriptionElRef} style={{width: "300px"}}/>
                                </div>
                            </form>
                        </Modal>
                    </>
                )}
                <div className="d-flex flex-row" style={{width: "100%", marginTop: "20px"}}>
                    <div className="task-status" 
                        style={{
                            borderBottom: this.state.selectedStatus == "inactive" ? "3px solid #C0C0C0" : "2px solid #eee"
                        }} 
                        onClick={() => this.setState({ selectedStatus: 'inactive'})}
                        >
                        Not Yet Started
                    </div>
                    <div className="task-status" 
                        style={{
                            borderBottom: this.state.selectedStatus == "active" ? "3px solid #FF6700" : "2px solid #eee"
                        }}
                        onClick={() => this.setState({ selectedStatus: 'active'})}
                        >
                        In Progress
                    </div>
                    <div className="task-status" 
                        style={{
                            borderBottom: this.state.selectedStatus == "completed" ? "3px solid #6CC417" : "2px solid #eee"
                        }}
                        onClick={() => this.setState({ selectedStatus: 'completed'})}
                        >
                        Completed
                    </div>
                </div>
                <div className="p-3">
                    {this.state.selectedStatus == "active" && 
                        <Active 
                            tasks={this.state.tasks} 
                            color="#C0C0C0" 
                            editTitle={(id, title) => this.editTitle(id, title)}
                            editDescription={(id, description) => this.editDescription(id, description)}
                            updateProgress={(id, progress) => this.updateProgress(id, progress)}
                            addNote={(id, note) => this.addNote(id, note)}
                            deleteNote={(id, noteId) => this.deleteNote(id, noteId)}
                            deleteTask={(taskId) => this.deleteTask(taskId)}
                        />
                    }
                    {this.state.selectedStatus == "inactive" && 
                        <Inactive 
                            tasks={this.state.tasks} 
                            color="#6CC417"
                            editTitle={(id, title) => this.editTitle(id, title)}
                            editDescription={(id, description) => this.editDescription(id, description)} 
                            updateProgress={(id, progress) => this.updateProgress(id, progress)}
                            addNote={(id, note) => this.addNote(id, note)}
                            deleteNote={(id, noteId) => this.deleteNote(id, noteId)}
                            deleteTask={(taskId) => this.deleteTask(taskId)}
                        />
                    }
                    {this.state.selectedStatus == "completed" && 
                        <Completed 
                            tasks={this.state.tasks} 
                            color="#6CC417" 
                            editTitle={(id, title) => this.editTitle(id, title)}
                            editDescription={(id, description) => this.editDescription(id, description)}
                            updateProgress={(id, progress) => this.updateProgress(id, progress)}
                            addNote={(id, note) => this.addNote(id, note)}
                            deleteNote={(id, noteId) => this.deleteNote(id, noteId)}
                            deleteTask={(taskId) => this.deleteTask(taskId)}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default TaskManagement;