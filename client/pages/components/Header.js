import styled from 'styled-components'
import { H2 } from './Typography'

const Wrapper = styled.header`
background-color: aliceblue;
display: flex;
justify-content: center;
align-items: center;
height: 100px;
`

const Header = () => {
    return (
        <Wrapper>
            <H2>Trello</H2>
        </Wrapper>
    )
}

export default Header