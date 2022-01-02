import { GetServerSidePropsContext } from "next";
import CoffeeCard from "./coffeecard";
import styled from "styled-components";
import { CoffeeCardType } from "../lib/types/entries";

const GridContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;

  @media (min-width: 600px) {
    justify-content: flex-start;
  }
`;

const CoffeeCardContainer = styled.div`
  display: flex;
  flex-basis: calc(100% / 3 - 4rem);
  border: 3px solid ${props => props.theme.colors.medium};
  border-radius: 2rem;
  margin: 1.5rem;
`;

function Grid({ type, entries }: { type: string, entries: CoffeeCardType[] }) {

  if (type === 'fav') {
    entries = entries.filter((entry) => entry.favorited)
  }

  const cards = entries.map((entry, i) => {
    return (
      <CoffeeCardContainer key={i.toString()}>
        <CoffeeCard
          origin_name={entry.origin_name}
          rating={entry.rating || 0}
          id={entry.id}
          favorited={entry.favorited}
          key={entry.id}
        />
      </CoffeeCardContainer>
    )
  })

  return (
    <GridContainer>
      {/* <h1>filter section</h1> */}
      { cards }
    </GridContainer>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  }
}

export default Grid
