import Header from './components/Header'
import Login from './components/Login'

export default function Home({ data }) {
  console.log('data', data)

  return (
    <div>
      <Header />
      <Login />
    </div>
  )
}

export async function getStaticProps() {
  const req = await fetch('http://localhost:4000/hello')
  const data = await req.json();

  if (!data) {
    return {
      notFound: true,
    }
  }
  console.log('data', req)

  return {
    props: { data }
  };
}