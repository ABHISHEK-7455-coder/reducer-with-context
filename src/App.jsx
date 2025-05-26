import { useReducer } from 'react'
import { TasksContext, TasksDispatchContext } from './TaskContext';
import TaskList from './TaskList';
import AddTask from './AddTasks'
import './App.css'

export default function App() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks)

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext value={dispatch}>
        <AddTask></AddTask>
        <TaskList></TaskList>
      </TasksDispatchContext>
    </TasksContext.Provider>
  )
}

function taskReducer(tasks, action) {
  switch (action.type) {
    case 'added' : {
      return [...tasks, {
        id:action.id,
        text:action.text,
        done:false
      }]
    }
    case 'change' : {
      return tasks.map(t => {
        if(t.id === action.task.id){
          return action.task;
        }else{
          return t;
        }
      })
    }
    case 'delete' : {
      return tasks.filter(t => t.id !== action.id)
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];


