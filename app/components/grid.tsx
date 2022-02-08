import CoffeeCard from "./coffeecard";
import styled from "styled-components";
import { CoffeeCardType } from "../lib/types/entries";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(110px + 4rem), calc(240px + 4rem)));
  align-content: center;
`;

const CoffeeCardContainer = styled.div`
  display: flex;
  border: 3px solid ${props => props.theme.colors.medium};
  border-radius: 2rem;
  margin: 1rem;
  min-width: 200px;
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

export default Grid
