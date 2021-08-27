import Header from './components/Header'
import Login from './components/Form'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Home({ boards }) {
  const [formValue, setFormValue] = useState('')

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const createBoard = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/boards', {
      method: 'POST',
      body: JSON.stringify({ name: formValue }),
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
    })
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        console.log('Board created', info)
        refreshData()
      })
  }

  const deleteBoard = (e, boardId) => {
    e.preventDefault();
    fetch(`http://localhost:4000/boards/${boardId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
    })
      .then((res) => {
        console.log('respone', res)
        return res.json();
      })
      .then((info) => {
        console.log('Board deleted', info)
        refreshData()
      })
  }

  return (
    <div>
      {/* <Header /> */}
      {/* <Login /> */}
      {boards.map((board, i) => {
        return (
          <div key={i}>
            <p>{board.name}</p>
            <button onClick={(e) => deleteBoard(e, board.id)}>Delete board</button>
          </div>
        )
      })}

      <form onSubmit={createBoard}>
        <label>Board name</label>
        <input type='text' name='Board' value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type='submit'>Add board</button>
      </form>
    </div>
  )
}

export async function getStaticProps() {
  const req = await fetch('http://localhost:4000/boards')
  const boards = await req.json();

  if (!boards) {
    return {
      notFound: true,
    }
  }

  return {
    props: { boards }
  };
}