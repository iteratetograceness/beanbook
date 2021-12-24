import styled from 'styled-components';
import ActionCard from './actioncard';
import Greeting from './greeting';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 1.5em;
`;

const ActionCardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  overflow-y: scroll;
  justify-content: space-between;
`;

function HomePage() {
  return (
    <Container>
      <Greeting />
      <ActionCardContainer>
        <ActionCard 
          title='have you tried new beans recently?' 
          text='click here to add a new entry'
          type='entry'
        />
        <ActionCard 
          title='looking for something specific?' 
          text="maybe you'll find what you need"
          type='search'
        />
        <ActionCard 
          title='your favorite entries' 
          text="your most loved beans are all here"
          type='favorites'
        />
      </ActionCardContainer>
    </Container>
  )
}

export default HomePage
