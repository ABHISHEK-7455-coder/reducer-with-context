import { useState, useContext } from 'react';
import { TasksContext, TasksDispatchContext } from './TaskContext';

export default function TaskList(){
    const tasks = useContext(TasksContext);

    return (
        <ul>
            {tasks.map(task => {
                console.log(task)
                return <li key={task.id}>
                    <Tasks task = {task}></Tasks>
                </li>
})}
        </ul>
    )
}

function Tasks({task}){
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useContext(TasksDispatchContext);

    let taskContent;
    if(isEditing){
        taskContent = (
            <>
            <input type="text" 
                value={task.text}
                onChange={e => {
                    dispatch({
                        type: 'change',
                        task: {
                            ...task, id:task.id,
                            text: e.target.value
                        }
                    })
                }}
            />
            <button onClick={()=>setIsEditing(false)}>Save</button>
            </>
        )
    }else{
        taskContent = (
            <>
            {task.text}
            <button onClick={()=>setIsEditing(true)}>Edit</button>
            </>
        )
    }

    return (
        <label>
            <input type="checkbox"
                checked={task.done}
                onChange={e=>{
                    dispatch({
                        type:'change',
                        task:{
                            ...task, id:task.id,
                            done:e.target.checked
                        }
                    })
                }}
            />
            {taskContent}
            <button
                onClick={()=>{
                    dispatch({
                        type: 'delete',
                        id:task.id
                    })
                }}
            >Delete</button>
        </label>
    )
}