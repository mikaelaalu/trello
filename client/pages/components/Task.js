import styled from "styled-components"

const TaskWrapper = styled.div`
  background-color: #ffff;
  border-radius: 4px;
  box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
  padding: 0.5rem;

  :hover {
    background-color: #fafafa;
    cursor: pointer;
  }
`

const Task = ({ task, setPopUpInfo, refreshData }) => {
  return (
    <TaskWrapper onClick={() => setPopUpInfo(task)}>
      <p style={{ margin: 0 }}>{task.name}</p>
      <p style={{ fontSize: "12px", margin: 0 }}>{task.description}</p>
    </TaskWrapper>
  )
}

export default Task
