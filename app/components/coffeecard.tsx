import styled from "styled-components"
import { HeartFilled, HeartOutlined, RightCircleFilled, StarOutlined, StarFilled } from "@ant-design/icons";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/router";

const Container = styled.div`
  display: grid;
  grid-rows: repeat(4, 1fr);
  justify-items: start;
  align-items: center;
  color: ${props => props.theme.colors.darkish};
  background-color: ${props => props.theme.colors.light};
  border-radius: 2rem;
  padding: 2rem;
  min-width: 210px;
  max-width: 210px;
  min-height: 200px;
  max-height: 210px;
  flex-grow: 1;
  gap: 1rem;

  h3 {
    margin: 0;
  }

  &:hover {
    opacity: 0.75;
    transition: opacity 0.2s ease-in-out;
  }

  span {
    font-size: 25px;
  }

  .go {
    justify-self: end;
  }
`;

const StarContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

interface CoffeeCardProps {
  origin_name: string;
  rating: number;
  id: string;
  favorited: boolean;
}

function CoffeeCard({ origin_name, rating, id, favorited }: CoffeeCardProps) {
  const [liked, setLiked] = useState(favorited)
  const [stars, setStars] = useState(rating)
  const router = useRouter();

  const handleRating = async (e: MouseEvent) => {
    e.preventDefault()
    const star_num = e.currentTarget.attributes['name' as any].value
    setStars((prev) => Number(star_num) + 1)
    // await fetch to API to update rating
  }

  const starArr = new Array(5).fill(0).map((_, index) => {
    if (index < stars) {
      return <StarFilled name={index.toString()} key={index} onClick={(e) => handleRating(e)} />
    } else {
      return <StarOutlined name={index.toString()} key={index} onClick={(e) => handleRating(e)} />
    }
  })

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
  }

  const handleLike = async (e: MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    // await fetch to API to edit entry
  }

  const handleGoTo = (e: MouseEvent) => {
    e.preventDefault();
    router.push({
      pathname: `/entry/${origin_name}`,
      query: { id }
    });
  }

  return (
    <Container onClick={(e) => handleClick(e)}>
      { liked ? 
      <HeartFilled onClick={handleLike} /> : 
      <HeartOutlined onClick={handleLike} /> }
      <h3>{origin_name}</h3>
      <StarContainer>
        { starArr }
      </StarContainer>
      <RightCircleFilled onClick={handleGoTo} className='go' />
    </Container>
  )
}



export default CoffeeCard
