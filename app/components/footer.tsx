import styled from "styled-components"

const Container = styled.div`
  background-color: ${props => props.theme.colors.light};
  flex-shrink: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.dark};
`;

function Footer() {
  return (
    <Container>
      <p>BeanBook ♡ Created on Caffeine!</p>
    </Container>
  )
}

export default Footer
