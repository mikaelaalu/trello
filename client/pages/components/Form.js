import styled from "styled-components"

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.small ? "10.5rem" : "12rem")};
`
const FormInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 0.8rem;
`
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
`

export { StyledForm, FormInput, FormWrapper }
