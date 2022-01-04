import { CheckCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import React, { MouseEvent } from "react";

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

const FilterContainer = styled.div`
  display: flex;
  flex-flow: row wrap !important;
  margin-bottom: 2rem;

  button {
    width: auto;
    cursor: pointer;
  }
`;


const Label = styled.label`
  font-size: 1rem;
  font-family: Inconsolata;
`;

const brewMethods = [ 'cupping', 'drip', 'espresso', 'siphon', 'aeropress', 'chemex', 'pour over', 'french press' ]

const tasteTags = [ 'sweet', 'acidic', 'bitter', 'salty', 'spicy', 'berry', 'fruity', 'citrus', 'floral', 'chocolate', 'herbal', 'nutty', 'savory', 'caramel', 'smoky', 'clean' ]

function EntryPageThree({ brew_method, setBrewMethod, taste_tags, setTasteTags, entry }: { brew_method: string[], setBrewMethod: Function, taste_tags: string[], setTasteTags: Function, entry?: any }) {
  
  const listOfMethods = brewMethods.map((method: string, index: number) => {
    return (
      <button key={index} onClick={(e: MouseEvent) => handleClickMethods(e)} 
        className={ entry && brew_method && brew_method.includes(method) ? 'filter-toggled' : 'no-toggle' }>
        <CheckCircleOutlined style={{ display: 'none' }}/>
        {method}
      </button>
    )
  })

  const listOfTags = tasteTags.map((taste: string, index: number) => {
    return (
      <button key={index} onClick={(e: MouseEvent) => handleClickTags(e)} 
        className={ entry && taste_tags && taste_tags.includes(taste) ? 'filter-toggled' : 'no-toggle' }>
        <CheckCircleOutlined style={{ display: 'none' }}/>
        {taste}
      </button>
    )
  })

  const handleClickMethods = (e: MouseEvent) => {
    e.preventDefault()
    const method = e.currentTarget.textContent
    const child = e.currentTarget.children[0] as HTMLElement
    let className = e.currentTarget.className

    if (!brew_method) setBrewMethod(new Array(1).fill(method))
    else if (brew_method.includes(method as any)) {
      const new_methods = brew_method.filter((str: string) => str !== method)
      setBrewMethod(new_methods)
    } else setBrewMethod((prev:any) => [...prev, method])

    if (className === 'no-toggle') {
      e.currentTarget.className = 'filter-toggled'
      child.setAttribute('style', 'display: block; margin-right: 5px')
    } else {
      e.currentTarget.className = 'no-toggle'
      child.setAttribute('style', 'display: none')
    }
  };

  const handleClickTags = (e: MouseEvent) => {
    e.preventDefault()
    const tag = e.currentTarget.textContent
    const child = e.currentTarget.children[0] as HTMLElement
    let className = e.currentTarget.className

    if (!taste_tags) setTasteTags(new Array(1).fill(tag))
    else if (taste_tags.includes(tag as any)) {
      const new_taste_tags = taste_tags.filter((taste: string) => taste !== tag)
      setTasteTags(new_taste_tags)
    } else setTasteTags((prev:any) => [...prev, tag])
    
    if (className === 'no-toggle') {
      e.currentTarget.className = 'filter-toggled'
      child.setAttribute('style', 'display: block; margin-right: 5px')
    } else {
      e.currentTarget.className = 'no-toggle'
      child.setAttribute('style', 'display: none')
    }
  };

  return (
    <Container>
      <Label>brew method(s)</Label>
      <FilterContainer>
        {listOfMethods}
      </FilterContainer>

      <Label>taste</Label>
      <FilterContainer>
        {listOfTags}
      </FilterContainer>
    </Container>
  )
}

export default EntryPageThree
