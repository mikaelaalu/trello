import styled from 'styled-components'
import { useState } from 'react'
import { H4, Paragraph } from './Typography'
import { StyledForm, FormInput } from './Form'
import Button from './Button'
const Wrapper = styled.div`
width: 100vw;
height: 100vh;
position: absolute;
background-color: rgba(0, 0, 0, 0.4);
`
const PopUpBox = styled.div`
width: 15rem;
height: 15rem;
position: absolute;
top: 15rem;
left: 43vw;
border: 1px solid black;
border-radius: 2px;
padding: 1rem;
background-color: white;
display: flex;
flex-direction: column;
justify-content: space-between;
`

const PopUp = ({ onCloseClick, popUpInfo, refreshData }) => {
    const [formValue, setFormValue] = useState('')
    console.log('popup', popUpInfo)

    const updateTask = (taskId) => {
        console.log('taskId', taskId)
        fetch(`http://localhost:4000/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({ description: formValue, id: taskId }),
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
        })
            .then((res) => {
                setFormValue('')
                refreshData()
                return res.json();
            })
    }
    return (
        <Wrapper>
            <PopUpBox>
                <div>
                    <H4>{popUpInfo.name}</H4>
                    <Paragraph> {popUpInfo.description} </Paragraph>

                    <StyledForm>
                        <FormInput placeholder="Add description" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                        <Button text="Save" onClick={(e) => {
                            e.preventDefault()
                            updateTask(popUpInfo.id)
                        }} />
                    </StyledForm>
                </div>
                <div>
                    <Button onClick={onCloseClick} text='Close' />
                </div>
            </PopUpBox>
        </Wrapper>
    )
}

export default PopUp