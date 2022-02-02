import Head from 'next/head';
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { request } from 'graphql-request'
import styled from 'styled-components';
import Loading from '../../components/loading';
import Layout from '../../components/layout';
import { useMutation } from "@apollo/client";
import { GET_ENTRY, UPDATE_ENTRY, DELETE_ENTRY } from '../../lib/queries';
import { HeartFilled, HeartOutlined, DollarCircleFilled, CoffeeOutlined, ShopOutlined, CalendarFilled, ExperimentOutlined, TableOutlined, PaperClipOutlined, FireFilled, TagOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';


const Container = styled.div`
  background-color: ${props => props.theme.colors.light};
  width: calc(100vw - 9rem);
  border-radius: 2rem;
  margin: 0 2rem;
  padding: 2rem;

  hr {
    height: 1px;
    color: ${props => props.theme.colors.darkish};
    background-color: ${props => props.theme.colors.darkish};
    border-style: none;
    border: none;
  }
`;

const Rating = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
  background-color: ${props => props.theme.colors.darkish};
  color: ${props => props.theme.colors.light};
  padding: .5rem 1rem;
  border-radius: 2rem;
  margin-left: 1rem;
`;

const TopDetails = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  color: ${props => props.theme.colors.darkish};
  display: flex;
  align-items: center;

  h1 {
    margin-left: 20px;
    flex-grow: 1;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  
  p {
    display: flex;
    align-items: center;

    span {
      margin-right: 7px;
    }
  }
`;

const Notes = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.darkish};
  color: ${props => props.theme.colors.light};
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1rem;

  h3 {
    margin: 0;
  }

  span {
    margin-right: 5px;
  }
`;

const MethodsAndTags = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 1rem 0;
`

const ArrContainer = styled.div`
  background-color: ${props => props.theme.colors.medium};
  border-radius: 1rem;
  padding: 1rem;

  h3 {
    margin: 0;
  }

  span {
    margin-right: 5px;
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  padding: 0.1rem 0.7rem;
  margin-right: 0.5rem;
  font-size: .8rem;
  font-weight: bold;
  border-radius: 2rem;
  border: none;
  height: 25px;
  margin-top: .5rem;
  background-color: #433f3c;
  color: #ded9d1;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  button {
    padding: .5rem 1rem;
    border: none;
    border-radius: 2rem;
    width: fit-content;
    background-color: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.light};
  }
`;

const fetcher = (query:any, variables:any)  => request('/api/graphql', query, variables)

const Entry = () => {

  const router = useRouter()
  const { id } = router.query
  const variables = { id }

  const { data: entry, error: loadingError } = useSWR([ GET_ENTRY, variables ], fetcher)
  
  const [ liked, setLiked ] = useState(false);

  useEffect(() => {
    setLiked(() => entry?.getEntry.favorited)
  }, [entry])

  const [ updateEntry, { loading, error: postError } ] = useMutation(UPDATE_ENTRY);
  const [ deleteEntry ] = useMutation(DELETE_ENTRY);

  const handleLike = async (e: MouseEvent) => {
    e.preventDefault();
    const update = {
      id: router.query.id,
      favorited: !liked
    }
    await updateEntry({ variables: { entry: update } })
    setLiked(!liked);
    window.location.reload();
  }

  const handleEdit = () => {
    const oldValues = {...entry.getEntry, id: router.query.id};
    router.push({
      pathname: '/edit',
      query: oldValues
    });
  }

  const handleDelete = () => {
    const entryID = router.query.id
    deleteEntry({ variables: { entryID } })
      .then((res) => {
        if (res.data.deleteEntry.validation) {
          window.location.href = '/home'
        } else alert('Could not delete entry!');
      })
      .catch(err => console.log(err));
  }

  const listOfMethods = entry?.getEntry.brew_method.map((method: string, index: number) => {
    return (
      <Tag key={index}>
        {method}
      </Tag>
    )
  })

  const listOfTags = entry?.getEntry.taste_tags.map((taste: string, index: number) => {
    return (
      <Tag key={index}>
        {taste}
      </Tag>
    )
  })

  if (loadingError) router.push('/404')
  if (!entry || loading) return <Loading />;
  else {
    return (
    <Layout>
      <Head>
        <title>{entry?.getEntry.origin_name}</title>
      </Head>
      <Container>
        <TopDetails>
          <p>{new Date(((new Date(Number(entry?.getEntry.created_on))).getTime())-((new Date(Number(entry?.getEntry.created_on)))).getTimezoneOffset() * 60000).toDateString()}</p>
          <Rating>{entry?.getEntry.rating} / 5</Rating>
        </TopDetails>
        <hr/>
        <Header>
          { liked ? <HeartFilled onClick={(e: any) => handleLike(e)} style={{ fontSize: '2rem' }}/> 
          : <HeartOutlined onClick={(e: any) => handleLike(e)} style={{ fontSize: '2rem' }}/>}
          <h1>{entry?.getEntry.origin_name}</h1>
        </Header>
        <hr/>
        <Details>
          <p><DollarCircleFilled style={{ fontSize: '1rem' }}/>price: ${entry?.getEntry.price}</p>
          <p><ShopOutlined style={{ fontSize: '1rem' }}/>producer: {entry?.getEntry.producer}</p>
          <p><FireFilled style={{ fontSize: '1rem' }}/>roaster: {entry?.getEntry.roaster}</p>
          <p><CalendarFilled style={{ fontSize: '1rem' }}/>roast date: {(new Date(Number(entry?.getEntry.roast_date))).toDateString()}</p>
          <p><ExperimentOutlined style={{ fontSize: '1rem' }}/>process: {entry?.getEntry.process}</p>
          <p><TableOutlined style={{ fontSize: '1rem' }}/>variety: {entry?.getEntry.variety}</p>
        </Details>
        <Notes>
          <h3><PaperClipOutlined style={{ fontSize: '1rem' }}/>notes:</h3>
          <p>{entry?.getEntry.notes}</p>
        </Notes>
        <MethodsAndTags>
          <ArrContainer>
            <h3><CoffeeOutlined style={{ fontSize: '1rem' }}/>brew method(s):</h3>
            {listOfMethods}
          </ArrContainer>
          <ArrContainer>
            <h3><TagOutlined style={{ fontSize: '1rem' }}/>taste:</h3>
            {listOfTags}
          </ArrContainer>
        </MethodsAndTags>
        <hr/>
        <ButtonContainer>
          <button onClick={handleEdit}>
              edit <FormOutlined />
          </button>  
          <button onClick={handleDelete}>
              delete <DeleteOutlined />
          </button>  
        </ButtonContainer>
        
      </Container>
      
    </Layout>
  )
  }
  
}

export default Entry;