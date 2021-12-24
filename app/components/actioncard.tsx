import styled from "styled-components"
import { PlusCircleOutlined, SearchOutlined, StarFilled } from "@ant-design/icons";
import { MouseEvent } from "react";
import { useRouter } from "next/router";
import SearchBar from "./search";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: ${props => props.theme.colors.darkish};
  background-color: ${props => props.theme.colors.light};
  border-radius: 2rem;
  padding: 3rem;
  margin: 0 15px;
  margin-bottom: 35px;
  width: 300px;
  height: 100%;
  min-height: 300px;
  flex-grow: 1;
  gap: 1rem;

  h2 {
    font-size: 3rem;
  }

  h2, p {
    margin: 0;
  }

  &:hover {
    opacity: 0.75;
    transition: opacity 0.2s ease-in-out;
  }
`;

interface Props {
  title: string
  type: string
  text: string
  image?: string
  link?: string
}



function ActionCard({ title, text, type, link, image }: Props) {
  const router = useRouter();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();

    if (type === 'entry') {
      router.push('/new');
    } else {
      return null;
    }
  }

  
  return (
    <Container onClick={(e) => handleClick(e)}>
      { type === "entry" && <PlusCircleOutlined style={{ fontSize: '40px' }}/> }
      { type === "search" && <SearchOutlined style={{ fontSize: '40px' }}/> }
      { type === "favorites" && <StarFilled style={{ fontSize: '40px' }}/> }
      <h2>{ title }</h2>
      <p>{ text }</p>
      { type === "search" && <SearchBar /> }
    </Container>
  )
}

export default ActionCard
