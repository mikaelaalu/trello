import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import styled from "styled-components"
import { H3, Paragraph } from "../components/Typography"
import Button from "../components/Button"
import { FormInput, FormWrapper } from "../components/Form"

const PageWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 51rem;
  height: 100vh;
`
const FlexWrapContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 2rem;
`
const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
  padding: 1rem;
  width: 10rem;
  height: 7rem;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
  cursor: pointer;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 12rem;
`

export default function Home({ boards }) {
  const [formValue, setFormValue] = useState("")
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }

  const createBoard = (e) => {
    e.preventDefault()
    fetch("http://localhost:4000/boards", {
      method: "POST",
      body: JSON.stringify({ name: formValue }),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => {
        setFormValue("")
        return res.json()
      })
      .then((info) => {
        console.log("Board created", info)
        refreshData()
      })
  }

  return (
    <PageWrapper>
      <Wrapper>
        <H3>YOUR BOARDS</H3>
        <FlexWrapContainer>
          {boards &&
            boards.map((board, i) => {
              return (
                <Link key={i} href={`/boards/${board.id}`}>
                  <ColumnFlex>
                    <Paragraph>{board.name}</Paragraph>
                  </ColumnFlex>
                </Link>
              )
            })}
        </FlexWrapContainer>

        <FormWrapper>
          <StyledForm onSubmit={createBoard}>
            <FormInput
              placeholder="Board title"
              type="text"
              name="Board"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
            />
            <Button text="Add board" />
          </StyledForm>
        </FormWrapper>
      </Wrapper>
    </PageWrapper>
  )
}

export const getStaticProps = async () => {
  const req = await fetch("http://localhost:4000/boards")
  const boards = await req.json()

  if (!boards) {
    return {
      notFound: true,
    }
  }

  return {
    props: { boards },
  }
}
