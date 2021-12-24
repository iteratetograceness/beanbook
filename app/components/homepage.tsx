import styled from 'styled-components';
import Greeting from './greeting';

const Container = styled.div`
margin: 0 1.5em;
`;

function HomePage() {
  return (
    <Container>
      <Greeting />
    </Container>
  )
}

export default HomePage
