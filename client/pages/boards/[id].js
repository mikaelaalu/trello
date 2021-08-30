import { useState } from 'react'
import { useRouter } from 'next/router';

const BoardDetails = ({ board, columns, tasks }) => {
    const [columnFormValue, setColumnFormValue] = useState('')
    const [taskFormValue, setTaskFormValue] = useState('')
    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const addColumn = (boardId) => {
        fetch('http://localhost:4000/columns', {
            method: 'POST',
            body: JSON.stringify({ name: columnFormValue, boardId }),
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log('Column created', data)
            })
    }

    const deleteColumn = (columnId, e) => {
        console.log('delete')
        e.preventDefault()
        fetch(`http://localhost:4000/columns/${columnId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
        })
            .then((res) => res.json())
            .then((info) => {
                console.log('Column deleted', info)
                refreshData()
            })
    }

    const addTask = (columnId, boardId) => {
        fetch('http://localhost:4000/tasks', {
            method: 'POST',
            body: JSON.stringify({ name: taskFormValue, columnId, boardId }),
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log('Task created', data)
            })
    }

    return (
        <>
            <div>
                <h3>Board details</h3>
                <p>{board.name}, ID {board.id}</p>
            </div>
            <div>
                <h5>Columns</h5>
                <div style={{ display: 'flex', marginBottom: '2rem' }}>
                    {columns.map((column, i) => {
                        const filteredTasks = tasks.filter((task) => task.column_id === column.id)
                        return (
                            <div key={i} style={{
                                display: 'flex', flexDirection: 'column', margin: '0 0.5rem', width: '200px', border: '1px solid black', padding: '1rem', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <button onClick={(e) => deleteColumn(column.id, e)}>Delete column</button>
                                <h3>{column.name}</h3>

                                {filteredTasks.map((task) => {
                                    return (
                                        <p>{task.name}</p>
                                    )
                                })}
                                <form onSubmit={() => addTask(column.id, board.id)}>
                                    <label>Add task</label>
                                    <input type='text' name='Task' value={taskFormValue} onChange={(e) => setTaskFormValue(e.target.value)} />
                                    <button type='submit'>Add task</button>
                                </form>
                            </div>
                        )
                    })}
                </div>
            </div >

            <form onSubmit={() => addColumn(board.id)}>
                <label>Column</label>
                <input type='text' name='Column' value={columnFormValue} onChange={(e) => setColumnFormValue(e.target.value)} />
                <button type='submit'>Add column</button>
            </form>
        </>
    )
}

export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:4000/boards')
    const data = await res.json()

    const paths = data.map((board) => {
        return {
            params: { id: board.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    const boardReq = await fetch(`http://localhost:4000/boards/${id}`)
    const board = await boardReq.json();

    const columnsReq = await fetch(`http://localhost:4000/columns/${id}`)
    const columns = await columnsReq.json()

    const tasksReq = await fetch(`http://localhost:4000/tasks/${id}`)
    const tasks = await tasksReq.json()

    if (!board) {
        return {
            notFound: true,
        }
    }

    return {
        props: { board, columns, tasks }
    };
}

export default BoardDetails