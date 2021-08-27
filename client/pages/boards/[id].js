
const BoardDetails = ({ board }) => {
    console.log('board', board)
    return (
        <>
            <h3>Board details</h3>
            <p>{board.name}, ID {board.id}</p>
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
    const req = await fetch(`http://localhost:4000/boards/${id}`)
    const board = await req.json();

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