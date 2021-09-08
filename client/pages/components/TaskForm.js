import styled from 'styled-components'
import { useState } from 'react'



const TaskForm = ({ columnId }) => {
    const [taskFormValue, setTaskFormValue] = useState('')

    const addTask = (columnId) => {
        fetch('http://localhost:4000/tasks', {
            method: 'POST',
            body: JSON.stringify({ name: taskFormValue, columnId }),
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
        })
            .then((res) => {
                setTaskFormValue('')
                return res.json();
            })
            .then((data) => {
                console.log('Task created', data)
            })
    }
    return (
        <form onSubmit={() => addTask(columnId)}>
            <label>Add task</label>
            <input type='text' name='Task' value={taskFormValue} onChange={(e) => setTaskFormValue(e.target.value)} />
            <button type='submit'>Add task</button>
        </form>
    )
}

export default TaskForm