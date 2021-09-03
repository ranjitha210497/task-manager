
import './App.css';
import TaskManagement from './Pages/TaskManagement';


function App() {
  return (
    <div className="App">
        <p className="semi-bold">Task Manager</p>
        <div className="p-2">
            <TaskManagement />
        </div>
    </div>
  );
}

export default App;
