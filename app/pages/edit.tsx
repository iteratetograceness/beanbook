import { Suspense, useEffect } from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { DefaultEntry, EmptyEntry } from '../lib/types/default-entry'

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

function EditBeans() {

  const router = useRouter()
  const { name } = router.query

  const tasteTags = [ 'floral', 'fruity', 'sour/fermented', 'green/vegetable', 'roasted', 'spices', 'nutty/cocoa', 'sweet', 'other' ]

  const brewMethods = [ 'cupping', 'drip', 'espresso', 'siphon', 'aeropress', 'chemex', 'pour over', 'french press' ]

  const keys = [ 'origin_name', 'price', 'roaster', 'producer', 'roast_date', 'variety', 'process', 'brew_method', 'taste_tags', 'notes' ]

  const generateCheckboxes = (tags: string[], name: string) => {
    return tags.map(tag => {

      let label = tag
      if (tag.includes('_')) label = tag.replace('_', ' ')
      if (tag === 'origin_name') label = 'Origin/Name'

      let child: {[key:string]:string} = {
        'tag': 'input',
        'type': 'checkbox',
        'name': name, 
        'value': tag, 
        'cf-label': label[0].toUpperCase() + label.substring(1)
      }

      if (name === 'brew_method' || name === 'taste_tags') child['cf-conditional-additional'] = name

      return child
    })
  }

  let entry: DefaultEntry = EmptyEntry;

  useEffect(() => {
    entry = sessionStorage.getItem('entry') ? JSON.parse(sessionStorage.getItem('entry') as string) : null
    if (!entry) router.push('/home')
  }, [])

  let fields = [
    {
      'tag': 'fieldset',
      'name': 'edit',
      'cf-questions': `Hi, looks like you\'re here to edit ${name}. Which of the following parts of this entry would you like to revise?`,
      'children': generateCheckboxes(keys, 'edit')
    },
    {
      'tag': 'input',
      'type': 'text',
      'name': 'origin_name',
      'cf-conditional-edit': 'origin_name',
      'cf-questions': `So you want to change the name of the beans from '${name}' to?`
    },
    {
      'tag': 'input',
      'type': 'text',
      'name': 'price',
      'cf-conditional-edit': 'price',
      'cf-questions': `You said you initially paid $${entry.price || 'nothing'} for these beans. What would you like to change the price to?`
    },
    {
      'tag': 'input',
      'type': 'text',
      'name': 'roaster',
      'cf-conditional-edit': 'roaster',
      'cf-questions': `You previously listed ${entry.roaster || 'no one'} as the roaster. What would you like to change that to?`
    },
    {
      'tag': 'input',
      'type': 'text',
      'name': 'producer',
      'cf-conditional-edit': 'producer',
      'cf-questions': `You previously listed ${entry.producer || 'no one'} as the producer. What would you like to change that to?`
    },
    {
      'tag': 'input',
      'type': 'text',
      'name': 'roast_date',
      'cf-conditional-edit': 'roast_date',
      'cf-questions': `You listed ${entry.roast_date || 'nothing'} for the roast date. What would you like to change that to?`
    },
    {
      'tag': 'input',
      'type': 'text',
      'name': 'variety',
      'cf-conditional-edit': 'variety',
      'cf-questions': `Previously, you noted the variety to be ${entry.variety || 'nothing'}. What would you like to change that to?`
    },
    {
      'tag': 'input',
      'type': 'text',
      'name': 'process',
      'cf-conditional-edit': 'process',
      'cf-questions': `You listed the process as ${entry.process || 'nothing'} initially. What would you like to change that to?`
    },
    {
      'tag': 'fieldset',
      'name': 'brew_method',
      'cf-conditional-edit': 'brew_method',
      'cf-questions': `Previously, you noted that you brewed these beans with the following: ${ entry.brew_method?.split(', ') || 'none'}.How did you brew these beans?`,
      'children': generateCheckboxes(brewMethods, 'brew_method')
      // TODO: add functionality to add custom brew methods
    },
    {
      'tag': 'fieldset',
      'name': 'taste_tags',
      'cf-conditional-additional': 'taste_tags',
      'cf-questions': 'How would you describe the taste of these beans?',
      'children': generateCheckboxes(tasteTags, 'taste_tags')
    },
    {
      'tag': 'input',
      'type': 'text',
      'name': 'other_taste_tags',
      'cf-conditional-additional': 'taste_tags|other',
      'cf-questions': 'Any other tasting notes you\'d like to specify? Please separate multiple phrases with commas.'
    },
    {
      'tag': 'textarea',
      'type': 'text',
      'name': 'notes',
      'cf-conditional-additional': 'notes',
      'cf-questions': 'Any additional details? Add any notes you\'d like to add to this entry.'
    },
  ]

  return (
    <Layout>
      { isSSR && <Container /> }
      { !isSSR && (
        <Suspense fallback={<div />}>
          <DynamicChatForm fields={fields} variant='editEntry'/>
        </Suspense>
      ) }
    </Layout>
  )
  
}

export default EditBeans