import styled from 'styled-components'
import { H4 } from './Typography'
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

const PopUp = ({ onCloseClick, popUpInfo }) => {
    console.log('popup', popUpInfo)
    return (
        <Wrapper>
            <PopUpBox>
                <div>
                    <H4>{popUpInfo.name}</H4>
                    <StyledForm>
                        <FormInput placeholder="Add description" />
                        <Button text="Save" onClick={(e) => {
                            e.preventDefault()
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