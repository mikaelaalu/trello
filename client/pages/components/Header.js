import styled from "styled-components"
import { H2 } from "./Typography"

const Container = styled.div`
  height: 4rem;
  background-color: #016aa6;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
`

const Header = () => {
  return (
    <Container>
      <H2>Trello</H2>
    </Container>
  )
}

export default Header
