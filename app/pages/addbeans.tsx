import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { beanSchema } from "../lib/yupSchemas";
import Layout from '../components/layout';
import styled from 'styled-components';
import { DefaultEntry, EmptyEntry } from '../lib/types/default-entry';
import { v1 as uuid } from 'uuid';
import { useSession } from "next-auth/react";
import dynamic from 'next/dynamic'

const schema = beanSchema

const DynamicChatForm = dynamic(() => import('../components/chatForm'), {
  ssr: false
})

const Container = styled.div`
  display: flex;
  flex-direction: row !important;
  align-items: center;
  justify-content: center;
  width: 100%;
  align-self: flex-end;
  margin-top: 1rem;
`

const isSSR = typeof window === 'undefined'


const tasteTags = [ 'sweet', 'acidic', 'bitter', 'salty', 'spicy', 'berry', 'fruity', 'citrus', 'floral', 'chocolate', 'herbal', 'nutty', 'savory', 'caramel', 'smoky', 'clean' ]

const brewMethods = [ 'cupping', 'drip', 'espresso', 'siphon', 'aeropress', 'chemex', 'pour over', 'french press' ]

const additionalDetails = [ 'price', 'roaster', 'producer', 'roast_date', 'variety', 'process', 'brew_method', 'taste_tags' ]

const generateCheckboxes = (tags: string[], name: string) => {
  return tags.map(tag => {

    if (tag.includes('_')) tag = tag.replace('_', ' ')

    return {
      'tag': 'input',
      'type': 'checkbox',
      'name': name,
      'value': tag,
      "cf-label": tag[0].toUpperCase() + tag.substring(1),
    }
  })
}

const fields = [
  {
    'tag': 'input',
    'type': 'text',
    'name': 'origin_name',
    'cf-questions': 'Hi, looks like you\'re here to add a new entry. What is the name and origin of the beans?'
  },
  {
    'tag': 'fieldset',
    'cf-questions': 'Want to mark this as a favorite?',
    'children': [
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'favorited',
        'value': 'true',
        "cf-label": "Yes",
        
      },
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'favorited',
        'value': 'false',
        "cf-label": "No",
        
      }
    ]
  },
  {
    'tag': 'fieldset',
    'cf-questions': 'On a scale of 1 to 5, how would you rate these beans?',
    'children': [
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'rating',
        'value': 1,
        "cf-label": "⭐",
      },
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'rating',
        'value': 2,
        "cf-label": "⭐⭐",
      },
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'rating',
        'value': 3,
        "cf-label": "⭐⭐⭐",
      },
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'rating',
        'value': 4,
        "cf-label": "⭐⭐⭐⭐",
      },
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'rating',
        'value': 5,
        "cf-label": "⭐⭐⭐⭐⭐",
      }
    ]
  },
  {
    'tag': 'fieldset',
    'cf-questions': 'Which of the following additional details would you like to add to this entry?',
    'children': generateCheckboxes(additionalDetails, 'additional')
  },
  {
    'tag': 'input',
    'type': 'text',
    'name': 'price',
    'cf-conditional-additional': 'price',
    'cf-questions': 'How much did you pay for these beans?'
  },
  {
    'tag': 'input',
    'type': 'text',
    'name': 'roaster',
    'cf-conditional-additional': 'roaster',
    'cf-questions': 'Who was the roaster?'
  },
  {
    'tag': 'input',
    'type': 'text',
    'name': 'producer',
    'cf-conditional-additional': 'producer',
    'cf-questions': 'Who was the producer?'
  },
  {
    'tag': 'input',
    'type': 'text',
    'name': 'roast_date',
    'cf-conditional-additional': 'roast_date',
    'cf-questions': 'When was the roast date?'
  },
  {
    'tag': 'input',
    'type': 'text',
    'name': 'variety',
    'cf-conditional-additional': 'variety',
    'cf-questions': 'What is the variety of these beans?'
  },
  {
    'tag': 'input',
    'type': 'text',
    'name': 'process',
    'cf-conditional-additional': 'process',
    'cf-questions': 'How were these beans processed?'
  },
  {
    'tag': 'fieldset',
    'name': 'brew_method',
    'cf-conditional-additional': 'brew_method',
    'cf-questions': 'How did you brew these beans?',
    'children': generateCheckboxes(brewMethods, 'brew_method')
    // TODO: add functionality to add custom brew methods
  },
  {
    'tag': 'fieldset',
    'name': 'taste_tags',
    'cf-conditional-additional': 'taste_tags',
    'cf-questions': 'How would you describe the taste of these beans?',
    'children': generateCheckboxes(tasteTags, 'taste_tags')
    // TODO: add functionality to add custom taste tags
  }
]

function AddBeans() {

  const router = useRouter()
  const { data: session } = useSession()

  return (
    <Layout>
      { isSSR && <Container /> }
      { !isSSR && (
        <Suspense fallback={<div />}>
          <DynamicChatForm fields={fields} variant='newEntry'/>
        </Suspense>
      ) }
    </Layout>
  )

  

  
}

export default AddBeans