import styled from "styled-components"
import { useState } from "react"
import { H4, Paragraph } from "./Typography"
import { StyledForm, FormInput } from "./Form"
import Button from "./Button"
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
`
const PopUpBox = styled.div`
  width: 15rem;
  height: 15rem;
  position: absolute;
  top: 15rem;
  left: 43vw;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 2px;
  border-radius: 2px;
  padding: 1rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const PopUp = ({ onCloseClick, popUpInfo, refreshData }) => {
  const [formValue, setFormValue] = useState("")

  const updateTask = (taskId) => {
    console.log("taskId", taskId)
    fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({ description: formValue, id: taskId }),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }).then((res) => {
      setFormValue("")
      refreshData()
      onCloseClick()
      return res.json()
    })
  }

  const deleteTask = (taskId) => {
    fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }).then((res) => {
      refreshData()
      onCloseClick()
      return res.json()
    })
  }
  return (
    <Wrapper>
      <PopUpBox>
        <div>
          <H4>{popUpInfo.name}</H4>
          <Paragraph> {popUpInfo.description} </Paragraph>

          <StyledForm>
            <FormInput
              placeholder="Add description"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
            />
            <Button
              text="Save"
              onClick={(e) => {
                updateTask(popUpInfo.id)
              }}
            />
          </StyledForm>
        </div>
        <ButtonContainer>
          <Button onClick={() => onCloseClick()} text="Close" />
          <Button text="Delete task" onClick={() => deleteTask(popUpInfo.id)} />
        </ButtonContainer>
      </PopUpBox>
    </Wrapper>
  )
}

export default PopUp
