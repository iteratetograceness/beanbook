import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  p {
    font-size: .8rem;
    color: black;
    margin: 0;
    font-family: 'Inconsolata', monospace;
  }

  input {
    height: 2rem;
    border-radius: 1rem;
    border: none;
    margin: .5rem 0;
    font-size: 1.2rem;
    padding: 0 1rem;
    color: grey;
  }

  input:focus {
    outline: none;
  }
`

const Label = styled.label`
  font-size: 1rem;
  font-family: Inconsolata;
`;

function EntryPageOne({ register, entry }: { register: Function, entry?: any }) {

  console.log(entry)

  return (
    <Container>
      <p style={{ marginBottom: '.5em' }}> * required </p>
      <Label>origin / name *</Label>
      <input 
        type='text'
        {...register('origin_name')}
        defaultValue={entry ? entry.origin_name : ''}
      />

      <Label>price</Label>
      <input 
        type='number'
        {...register('price')}
        defaultValue={entry ? entry.price : ''}
      />

      <Label>roaster</Label>
      <input 
        type='text'
        {...register('roaster')}
        defaultValue={entry ? entry.roaster : ''}
      />

      <Label>producer</Label>
      <input 
        type='text'
        {...register('producer')}
        defaultValue={entry ? entry.producer: ''}
      />
      
      <Label>roast date</Label>
      <input 
        type='date'
        {...register('roast_date')}
        defaultValue={ entry && entry.roast_date ? new Date(Number(entry.roast_date)).toISOString().split('T')[0] : 0 }
      />

    </Container>
  )
}

export default EntryPageOne
