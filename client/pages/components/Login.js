import styled from 'styled-components'


const StyledForm = styled.form`
width: 15rem;
height: 20rem;
display: flex;
flex-direction: column;
align-items: center;
padding: 1rem 0;
`

const StyledInput = styled.input`
border: none;
height: 1.2rem;
border-bottom: 1px solid black;
margin-bottom: 1rem;
`

const StyledLabel = styled.label`
margin-bottom: 1rem;
`

const StyledButton = styled.button`
background-color: coral;
border: none;
width: 100px;
height: 25px;
color: white;
`

const LoginForm = () => {
    return (
        <StyledForm>
            <StyledLabel>Username</StyledLabel>
            <StyledInput type='text' />
            <StyledLabel>Password</StyledLabel>
            <StyledInput type='text' />
            <StyledButton>Login</StyledButton>
        </StyledForm>
    )
}

export default LoginForm