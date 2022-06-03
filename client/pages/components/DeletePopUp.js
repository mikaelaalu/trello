import styled from "styled-components"
import { Paragraph } from "./Typography"
import Button from "./Button"

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
`
const PopUpBox = styled.div`
  width: 13rem;
  height: 10rem;
  position: absolute;
  top: 15rem;
  left: 43vw;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 2px;
  padding: 1rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2rem;
`

const DeletePopUp = ({ onCloseClick, deleteColumn }) => {
  return (
    <Wrapper>
      <PopUpBox>
        <Paragraph> Do you want to delete this column? </Paragraph>
        <ButtonWrapper>
          <Button
            text="Yes"
            onClick={(e) => {
              e.preventDefault()
              deleteColumn()
              onCloseClick()
            }}
          />
          <Button
            text="No"
            onClick={(e) => {
              e.preventDefault()
              onCloseClick()
            }}
          />
        </ButtonWrapper>
      </PopUpBox>
    </Wrapper>
  )
}

export default DeletePopUp
