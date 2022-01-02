import styled from 'styled-components';
import Title from './title';
import SearchBar from './search';
import { CoffeeCardType } from '../lib/types/entries';
import { SmileOutlined, CalendarOutlined } from '@ant-design/icons';
import CoffeeCard from './coffeecard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 4rem);
  margin: 0 2rem;
`;

const RecentlyAdded = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -13px;
  margin-top: 2px;
  align-items: center;

  div {
    margin: 10px;
  }
`;

const SearchContainer = styled.div`
  width: 60vw;

  @media (max-width: 830px) {
    width: 100%;
  }
`;

function HomePage({ name, entries }: { name: string, entries: CoffeeCardType[] }) {

  const recentCards = entries.map((entry: CoffeeCardType, i) => {
    return (
      <CoffeeCard
        origin_name={entry.origin_name}
        rating={entry.rating || 0}
        id={entry.id}
        favorited={entry.favorited}
        key={entry.id}
      />
    )
  });

  return (
    <Container>
      <Title name={`hello ` + name} icon={<SmileOutlined style={{ fontSize: '23px', marginRight: '10px' }}/>} />
      <SearchContainer>
        <SearchBar />
      </SearchContainer>
      <Title name='recently added' icon={<CalendarOutlined style={{ fontSize: '23px', marginRight: '10px' }}/>} />
      <RecentlyAdded>
        {recentCards}
      </RecentlyAdded>
    </Container>
  )
  
}

export default HomePage
