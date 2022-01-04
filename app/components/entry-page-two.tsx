import styled from 'styled-components';
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { MouseEvent } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 100%;

  .star-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  p {
    font-size: .8rem;
    color: black;
    margin: 0;
    font-family: 'Inconsolata', monospace;
  }

  span {
    font-size: 1.2rem;
  }

  input, textarea {
    height: 2rem;
    border-radius: 1rem;
    border: none;
    margin: .5rem 0;
    font-size: 1.2rem;
    padding: 0 1rem;
    color: grey;
  }

  button {
    background: none;
    border: none;
    padding: 1rem;
  }

  textarea {
    padding: 1rem 1rem;
    resize: vertical;
    height: 5.6rem;
  }

  input:focus {
    outline: none;
  }

  textarea:focus {
    outline: none;
  }
`

const Label = styled.label`
  font-size: 1rem;
  font-family: Inconsolata;
`;

function EntryPageOne({ stars, setStars, register, entry }: { stars: number, setStars: Function, register: Function, entry?: any }) {
  
  const handleRating = (e: MouseEvent) => {
    e.preventDefault()
    const star_num = e.currentTarget.attributes['name' as any].value
    setStars(Number(star_num) + 1)
  }

  const starArr = new Array(5).fill(0).map((_, index) => {
    if (index < stars) {
      return (
        <button key={index} name={index.toString()} onClick={(e: MouseEvent) => handleRating(e)} >
          <StarFilled />
        </button>
      )
    } else {
      return (
        <button key={index} name={index.toString()} onClick={(e: MouseEvent) => handleRating(e)} >
          <StarOutlined />
        </button>
      )
    }
  })

  return (
    <Container>
      <p style={{ marginBottom: '.5em' }}> * required </p>
      <Label>rating *</Label>
      <div className='star-container' >
        { starArr }
      </div>

      <Label>notes</Label>
      <textarea
        className='notes-input'
        {...register('notes')}
        defaultValue={entry ? entry.notes : ''}
      />

      <Label>process</Label>
      <input 
        type='text'
        {...register('process')}
        defaultValue={entry ? entry.process : ''}
      />

      <Label>variety</Label>
      <input 
        type='text'
        {...register('variety')}
        defaultValue={entry ? entry.variety : ''}
      />

    </Container>
  )
}

export default EntryPageOne
