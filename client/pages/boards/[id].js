import { useState } from 'react'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { H3 } from '../components/Typography';
import { StyledForm, FormInput } from '../components/Form'
import Button from '../components/Button';
import PopUp from '../components/PopUp';
import TaskForm from '../components/TaskForm';

const Wrapper = styled.div`
display: flex;
flex-direction: column;
`
const ColumnWrapper = styled.div`
display: flex;
flex-direction: column;
margin: 0 0.5rem;
width: 13rem;
height: 70vh;
border: 1px solid black;
padding: 1rem;
overflow-y: scroll;
justify-content: space-between;
`

const BoardDetails = ({ board }) => {
    const [columnFormValue, setColumnFormValue] = useState('')
    const [popUpInfo, setPopUpInfo] = useState()

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
                setColumnFormValue('')
                return res.json();
            })
    }

    const deleteColumn = (columnId) => {
        fetch(`http://localhost:4000/columns/${columnId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
        })
            .then((res) => {
                refreshData()
                return res.json()
            })
    }

    const deleteTask = (taskId) => {
        fetch(`http://localhost:4000/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
        })
            .then((res) => {
                refreshData()
                return res.json()
            })
    }
    return (
        <Wrapper>
            {popUpInfo && <PopUp onCloseClick={() => setPopUpInfo(null)} popUpInfo={popUpInfo} refreshData={refreshData} />}
            <div style={{ padding: '1rem' }}>
                <H3>{board.name}</H3>
            </div>
            <div style={{ display: 'flex', marginBottom: '2rem' }}>
                {board.columns.map((column, i) => {
                    return (
                        column.id &&
                        <ColumnWrapper key={i}>
                            <div>
                                <button onClick={() => deleteColumn(column.id)}>Delete column</button>
                                <h3>{column.name}</h3>
                                {column.tasks.map((task, i) => {
                                    return (
                                        task.id &&
                                        <div key={i}>
                                            <p>{task.name}</p>
                                            <p style={{ fontSize: '12px' }}>{task.description}</p>
                                            <button onClick={() => deleteTask(task.id)}>Delete task</button>
                                            <button onClick={() => setPopUpInfo(task)}>Update task</button>
                                        </div>
                                    )
                                })}
                            </div>
                            <TaskForm columnId={column.id} refreshData={refreshData} />
                        </ColumnWrapper>

                    )
                })}
            </div>
            <StyledForm onSubmit={() => addColumn(board.id)}>
                <FormInput placeholder='Column title' type='text' name='Column' value={columnFormValue} onChange={(e) => setColumnFormValue(e.target.value)} />
                <Button text="Add column" />
            </StyledForm>
        </Wrapper>
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
    if (!board) {
        return {
            notFound: true,
        }
    }

    return {
        props: { board }
    };
}

export default BoardDetails