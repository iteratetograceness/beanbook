import { useState, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { beanSchema } from "../lib/yupSchemas";
import Layout from '../components/layout';
import styled from 'styled-components';
import EntryPageOne from '../components/entry-page-one';
import EntryPageTwo from '../components/entry-page-two';
import EntryPageThree from '../components/entry-page-three';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import Button from '../components/button';
import { DefaultEntry, EmptyEntry } from '../lib/types/default-entry';
import { v1 as uuid } from 'uuid';
import { useSession } from "next-auth/react";
import { useMutation } from '@apollo/client';
import { ADD_ENTRY } from '../lib/queries';
import Loading from '../components/loading';

const schema = beanSchema

const Container = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.light};
  min-height: 50vh;
  width: 90%;
  padding: 2rem 0;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 465px) {
    flex-direction: column;

    .first-col-container {
      margin-bottom: 2rem;
    }

    .second-col {
      margin: 1rem;
    }
  }

  a {
    background-color: #f5f5f5;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  .first-col-container {
    flex-direction: row;
    width: 100px;
    flex-grow: 0;
  }

  .first-col {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 1rem;
    align-self: flex-start;
    color: ${props => props.theme.colors.light};
    background-color: ${props => props.theme.colors.dark};
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

    h1 {
      font-size: 2rem;
      margin: 0;
    }

    .new-keyword {
      color: ${props => props.theme.colors.darkest};
      font-size: 2.5rem;
    }
  }

  .second-col {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin: 0 2rem;
  }
`

const arrowStyles = {
  color: '#7e705f',
  fontSize: '3rem',
  cursor: 'pointer',
  width: '3rem',
  margin: '.5rem',
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row !important;
  align-items: center;
  justify-content: center;
  width: 100%;
  align-self: flex-end;
  margin-top: 1rem;

  button {
    &:hover {
      background-color: ${props => props.theme.colors.darkest};
      transform: scale(1.02);
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
  }

  span {
    &:hover {
      color: ${props => props.theme.colors.darkest} !important;
      transform: scale(1.03);
      transition: all 0.2s ease-in-out;
    }
  }
`

function AddBeans() {

  const router = useRouter()
  const { data: session } = useSession()
  const [ page, setPage ] = useState(1)
  const [ stars, setStars ] = useState(1)
  const [ brew_method, setBrewMethod ] = useState<string[]>([])
  const [ taste_tags, setTasteTags ] = useState<string[]>([])
  const [ entry, setEntry ] = useState<DefaultEntry>(EmptyEntry as DefaultEntry)

  const [addEntryMutation, { loading, error }] = useMutation(ADD_ENTRY);

  const { register, getValues } = useForm({
    resolver: yupResolver(schema)
  });

  const addEntry = async (e: MouseEvent) => {
    e.preventDefault()

    let newEntry: DefaultEntry = entry
    const values = getValues()
    const user_id = session?.user.user_id

    newEntry = {
      ...newEntry,
      ...values,
      price: values.price ? Number(values.price) : null,
      roast_date: values.roast_date ? new Date(values.roast_date) : null,
      brew_method: brew_method,
      taste_tags: taste_tags,
      rating: Number(stars),
      userid: user_id,
      id: uuid().toString()
    }

    addEntryMutation({ variables: { entry: newEntry } })
      .then(res => {
        if (!res.data.addEntry.validation || error) {
          // TODO: Custom error popup/toast
          console.log('ERROR', res, error)
          alert(error || res.data.addEntry.message)
        } else {
          router.push({
            pathname: `/entry/${newEntry.origin_name}`,
            query: { id: newEntry.id },
          })
        }
      })
      .catch(err => {
        // TODO: Custom error popup/toast
        alert(err.message)
      })
  }

  const nextPage = () => {
    setPage(prev => page + 1)
  }

  const prevPage = () => {
    setPage(prev => page - 1)
  }

  if (loading) {
    return <Loading/>
  } else {
      return (
      <Layout>
          <Container>
            <div className="first-col-container">
              <div className='first-col'>
                <h1>+</h1>
                <h1 className='new-keyword'>new</h1>
                <h1>entry</h1>
              </div>
            </div>

            <form className='second-col' id='entry-form'>
              { page === 1 && <EntryPageOne register={register} /> }
              { page === 2 && <EntryPageTwo stars={stars} setStars={setStars} register={register} /> }
              { page === 3 && <EntryPageThree brew_method={brew_method} setBrewMethod={setBrewMethod} taste_tags={taste_tags} setTasteTags={setTasteTags} /> }
              <ButtonContainer>
                { page > 1 && page <= 3 && <LeftCircleFilled style={arrowStyles} onClick={prevPage} /> }
                { page < 3 && <RightCircleFilled 
                  style={arrowStyles} 
                  onClick={nextPage} 
                /> }
                { page === 3 && <Button 
                  inverse='false' 
                  variant='primary' 
                  form='entry-form'
                  onClick={(e: any) => addEntry(e)}
                >
                  Submit
                </Button> }
              </ButtonContainer>
            </form>
          </Container>
      </Layout>
    )
  }
}

export default AddBeans