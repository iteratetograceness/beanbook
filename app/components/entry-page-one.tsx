import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { beanSchema } from "../lib/yupSchemas";
import styled from 'styled-components';
import { useForm } from "react-hook-form";

const schema = beanSchema

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

function EntryPageOne({ register }: { register: Function }) {

  return (
    <Container>
      <p style={{ marginBottom: '.5em' }}> * required </p>
      <Label>origin / name *</Label>
      <input 
        type='text'
        {...register('origin_name')}
      />

      <Label>price</Label>
      <input 
        type='number'
        {...register('price')}
      />

      <Label>roaster</Label>
      <input 
        type='text'
        {...register('roaster')}
      />

      <Label>producer</Label>
      <input 
        type='text'
        {...register('producer')}
      />
      
      <Label>roast date</Label>
      <input 
        type='date'
        {...register('roast_date')}
      />

    </Container>
  )
}

export default EntryPageOne
