import styled from 'styled-components'

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
            <h2>Trello</h2>
        </Wrapper>
    )
}

export default Header