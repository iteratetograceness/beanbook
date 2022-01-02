import styled from 'styled-components';
import CoffeeCard from './coffeecard';
import Title from './title';
import SearchBar from './search';
import { SmileOutlined, CalendarOutlined } from '@ant-design/icons';
import { GetServerSidePropsContext } from "next";

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

function HomePage({ name }: { name: string }) {

  return (
    <Container>
      <Title name={`hello ` + name} icon={<SmileOutlined style={{ fontSize: '23px', marginRight: '10px' }}/>} />
      <SearchContainer>
        <SearchBar />
      </SearchContainer>
      <Title name='recently added' icon={<CalendarOutlined style={{ fontSize: '23px', marginRight: '10px' }}/>} />
      <RecentlyAdded>
        <CoffeeCard id='1fas3fsadf' origin_name='Hidden Grounds Broadway' rating={5} favorited={true} />
        <CoffeeCard id='1fas3fsadf' origin_name='Hidden Grounds Broadway' rating={5} favorited={true}/>
        <CoffeeCard id='1fas3fsadf' origin_name='Hidden Grounds Broadway' rating={5} favorited={false}/>
        <CoffeeCard id='1fas3fsadf' origin_name='Hidden Grounds Broadway' rating={5} favorited={true}/>
      </RecentlyAdded>
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  // TODO: Get recent entries

  // return {
  //   notFound: true,
  // }

}

export default HomePage
