import { useAuth } from '../lib/auth'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0 1.5em;
`;

function Greeting() {
  const [ name, setName ] = useState('')
  const { getUserName } = useAuth()

  const handleGetName = async () => {
    const name = await getUserName()
    setName(name)
  }

  useEffect(() => {
    handleGetName();
  }, [])
 
  return (
    <Container>
      <h1>Hello { name.toUpperCase() }</h1>
    </Container>
  )
}

export default Greeting
