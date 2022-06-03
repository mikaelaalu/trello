import { useState } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"
import { H3 } from "../components/Typography"
import { StyledForm, FormInput } from "../components/Form"
import Button from "../components/Button"
import PopUp from "../components/PopUp"
import AddTask from "../components/AddTask"
import DeletePopUp from "../components/DeletePopUp"
import Task from "../components/Task"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 13rem;
  height: 70vh;
  border: 0.5px solid rgba(99, 99, 99, 0.4);
  box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
  padding: 1rem;
  overflow-y: scroll;
  justify-content: space-between;
  background-color: #ebecf0;
  border-radius: 3px;
`

const ColumnWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  padding-bottom: 1rem;
`

const DelButton = styled.button`
  cursor: pointer;
  border: none;
  width: 20px;
  height: 20px;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  background-color: inherit;
`

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const BoardDetails = ({ board }) => {
  const [columnFormValue, setColumnFormValue] = useState("")
  const [popUpInfo, setPopUpInfo] = useState()
  const [deletePopUpInfo, setDeletePopUpInfo] = useState()
  const [selectedColumnId, setSelectedColumnId] = useState()

  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const addColumn = (boardId, e) => {
    e.preventDefault()
    fetch("http://localhost:4000/columns", {
      method: "POST",
      body: JSON.stringify({ name: columnFormValue, boardId }),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => {
        setColumnFormValue("")
        return res.json()
      })
      .then((info) => {
        console.log("Column created", info)
        refreshData()
      })
  }

  const deleteColumn = (columnId) => {
    fetch(`http://localhost:4000/columns/${columnId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }).then((res) => {
      refreshData()
      return res.json()
    })
  }

  const deleteBoard = (boardId) => {
    fetch(`http://localhost:4000/boards/${boardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }).then((info) => {
      console.log("Board deleted", info)

      router.push("/boards")
    })
  }

  return (
    <Wrapper>
      {popUpInfo && (
        <PopUp
          onCloseClick={() => setPopUpInfo(null)}
          popUpInfo={popUpInfo}
          refreshData={refreshData}
        />
      )}
      <FlexWrapper>
        <H3>{board.name}</H3>
        <button onClick={() => deleteBoard(board.id)}>Delete board</button>
      </FlexWrapper>
      <ColumnWrapper>
        {board.columns &&
          board.columns.map((column, i) => {
            return (
              column.id && (
                <Column key={i}>
                  <div>
                    <ButtonWrapper>
                      <DelButton
                        onClick={() => {
                          setDeletePopUpInfo(true)
                          setSelectedColumnId(column.id)
                        }}
                      >
                        X
                      </DelButton>
                    </ButtonWrapper>

                    <h3>{column.name}</h3>
                    <TaskWrapper>
                      {column.tasks.map((task, i) => {
                        return (
                          task.id && (
                            <Task
                              key={i}
                              task={task}
                              setPopUpInfo={setPopUpInfo}
                              refreshData={refreshData}
                            />
                          )
                        )
                      })}
                    </TaskWrapper>
                  </div>

                  <AddTask columnId={column.id} refreshData={refreshData} />
                </Column>
              )
            )
          })}

        {deletePopUpInfo && (
          <DeletePopUp
            onCloseClick={() => setDeletePopUpInfo(false)}
            deleteColumn={() => deleteColumn(selectedColumnId)}
          />
        )}
      </ColumnWrapper>
      <StyledForm onSubmit={(e) => addColumn(board.id, e)}>
        <FormInput
          placeholder="Column title"
          type="text"
          name="Column"
          value={columnFormValue}
          onChange={(e) => setColumnFormValue(e.target.value)}
        />
        <Button text="Add column" />
      </StyledForm>
    </Wrapper>
  )
}

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:4000/boards")
  const data = await res.json()
  const paths = data.map((board) => {
    return {
      params: { id: board.id.toString() },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const boardReq = await fetch(`http://localhost:4000/boards/${id}`)
  const board = await boardReq.json()
  if (!board) {
    return {
      notFound: true,
    }
  }

  return {
    props: { board },
  }
}

export default BoardDetails
