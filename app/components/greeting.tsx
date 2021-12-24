import { useAuth } from '../lib/auth'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SmileOutlined } from '@ant-design/icons';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 35px;
  margin-left: 15px;
  width: 130px;
  color: ${props => props.theme.colors.light};
  border-radius: 2rem;
  background-color: ${props => props.theme.colors.darkish};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  span {
    font-weight: bold;
  }
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
      <SmileOutlined style={{ fontSize: '25px' }}/>
      <p>hello <span>{ name.toLowerCase() }</span>!</p>
    </Container>
  )
}

export default Greeting
