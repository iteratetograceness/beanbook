import styled from "styled-components"
import { SearchOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 35px;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;

const Bar = styled.div`
  display: flex;
  border-radius: 2rem;
  align-items: center;
  justify-content: flex-start;
  padding: 0 9px;
  font-weight: 700;
  color: ${props => props.theme.colors.light};
  background-color: ${props => props.theme.colors.dark};
  height: 45px;
  width: calc(100% - 30px);

  span {
    margin-left: 10px;
  }

  input {
    background-color: transparent;
    border: none;
    font-size: 1rem;
    font-family: Inconsolata;
    flex: 1;
    color: ${props => props.theme.colors.light};
  }

  input:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  height: 45px;
  width: 100px;
  font-family: Inconsolata;
  background-color: ${props => props.theme.colors.darkish};
  border-radius: 2rem;
  border: none;
  margin-left: .5rem;
  color: ${props => props.theme.colors.light};

  &:hover {
    transition: all 0.2s ease-in-out;
    opacity: 0.8;
  }
`;

function SearchBar() {
  const [value, setValue] = useState('')
  const [filters, setFilters] = useState([])

  const router = useRouter();

  const rawFilters: Array<string> = ['origin/name', 'roaster/producer', 'variety', 'process', 'notes']

  const filterList = rawFilters.map((filter, index) => {
    return (
      <button 
        key={index} 
        className='no-toggle'
        onClick={(e) => {
          e.preventDefault()
          // TODO: double check state logic for filter array 
          if (e.currentTarget.className === 'filter-toggled') {
            const newFilters = filters.filter((f) => f !== filter)
            e.currentTarget.className = 'no-toggle';
            const child = e.currentTarget.children[0] as HTMLElement
            child.setAttribute('style', 'display: none')
            setFilters(prev => newFilters as any)
          } else {
            const newFilters = [...filters, filter];
            e.currentTarget.className = 'filter-toggled';
            const child = e.currentTarget.children[0] as HTMLElement
            child.setAttribute('style', 'display: block; margin-left: 5px')
            setFilters(prev => newFilters as any)
          }
        }}
      >
        { filter }
        <CheckCircleOutlined style={{ display: 'none' }}/>
      </button>
    )
  })

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    // TODO: route to search entry card grid
    
    let query = value.split(' ').join('%|%');
    query = '%' + query + '%';

    let filter: string[] = []

    for (let str of filters) {
      if (str === 'origin/name') filter.push('origin_name')
      if (str === 'roaster/producer') {
        filter.push('roaster', 'producer')
      }
      if (str === 'notes') filter.push('notes')
      if (str === 'variety') filter.push('variety')
      if (str === 'process') filter.push('process')
    }

    router.push({
      pathname: `/search`,
      query: { query, filter }
    });
  }

  return (
    <SearchContainer>
      <FilterContainer>
        { filterList }
      </FilterContainer>
      <MainContainer>
        <Bar>
          <SearchOutlined style={{ 'marginRight': '7px' }}/>
          <input 
            type='text' 
            key='search' 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
          />
        </Bar>
        <SearchButton onClick={(e) => handleSearch(e)}>enter</SearchButton>
      </MainContainer>
    </SearchContainer>
  )
}

export default SearchBar
