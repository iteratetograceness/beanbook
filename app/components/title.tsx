import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-self: flex-start;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.2rem;
  margin-bottom: 20px;
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

function Title({ name, icon }: { name: string, icon: any }) {
  return (
    <Container>
      {icon}
      <p><span>{ name }</span></p>
    </Container>
  )
}

export default Title
