import { StyledForm, FormInput } from './Form'
import Button from './Button'
import { useState } from 'react'

const UpdateTask = ({ columnId, refreshData }) => {
    const [taskFormValue, setTaskFormValue] = useState('')

    const addTask = (columnId, e) => {
        e.preventDefault();
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
                refreshData()
                return res.json();
            })
    }
    return (
        <StyledForm small onSubmit={(e) => addTask(columnId, e)}>
            <FormInput placeholder='Task title' type='text' name='Task' value={taskFormValue} onChange={(e) => setTaskFormValue(e.target.value)} />
            <Button text='AddTask' />
        </StyledForm>
    )
}

export default UpdateTask