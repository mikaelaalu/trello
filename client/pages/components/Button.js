import styled from "styled-components"

const StyledButton = styled.button`
  background-color: #0479bf;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
`

const Button = ({ text, onClick }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>
}

export default Button
