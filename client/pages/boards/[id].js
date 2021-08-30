import { useState } from 'react'

const BoardDetails = ({ board, columns }) => {
    const [formValue, setFormValue] = useState('')

    console.log('column', columns)

    const addColumn = (boardId) => {
        fetch('http://localhost:4000/columns', {
            method: 'POST',
            body: JSON.stringify({ name: formValue, boardId: boardId }),
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
                        return (
                            <div key={i} style={{
                                display: 'flex', flexDirection: 'column', margin: '0 0.5rem', width: '100px', backgroundColor: 'coral', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <p>{column.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div >

            <form onSubmit={() => addColumn(board.id)}>
                <label>Column</label>
                <input type='text' name='Column' value={formValue} onChange={(e) => setFormValue(e.target.value)} />
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

    if (!board && !columns) {
        return {
            notFound: true,
        }
    }

    return {
        props: { board, columns }
    };
}

export default BoardDetails