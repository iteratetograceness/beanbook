import { useRef, useEffect } from 'react'
import { ConversationalForm } from 'conversational-form'
import { GQLClient } from '../lib/graphqlClient'
import { gql } from 'graphql-request'
import { v1 as uuid } from 'uuid'
import { useSession } from 'next-auth/react'
import router from 'next/router'

const ADD_ENTRY = gql`
mutation Mutation($entry: EntryInput) {
  addEntry(entry: $entry) {
    validation
    message
  }
}`;

const ChatForm = ({ fields, variant }: { fields: object[], variant: string }) => {

  const { data: session } = useSession()

  let chat: any = null
  const ref = useRef<any>(null)

  useEffect(() => {

    chat = ConversationalForm.startTheConversation({
      options: {
        submitCallback: variant === 'newEntry' ? addNewEntry : editEntry,
        preventAutoFocus: true,
        flowStepCallback: (dto: any, success: () => void, error: (msg: string) => void) => {
          console.log(dto.tag.name, dto.text)
          if ((dto.tag.name === 'origin_name' || dto.tag.name === 'favorited') && !dto.text) return error('Required field!')
          if (dto.tag.name === 'price' && !Number.isInteger(Number(dto.text))) return error('Must be a number!')
          return success()
        },
        userInterfaceOptions:{
          controlElementsInAnimationDelay: 150,
          robot: {
              robotResponseTime: 0,
              chainedResponseTime: 400
          }
      }
      },
      tags: fields
    })

    ref.current.appendChild(chat.el)

    return () => chat.remove()

  }, [])

  const goToEntry = (name: string, id: string) => {
    router.push({
      pathname: `/entry/${name}`,
      query: { id },
    })
  }

  const addNewEntry = () => {
      const userid = session?.user.user_id
      const data = chat.getFormData(true)
      const favorited = data.favorited === 'true'
      const rating = Number(data.rating[0])
      if (data.other_taste_tags) data.taste_tags = data.taste_tags.concat(data.other_taste_tags.split(',')) 
      else data.taste_tags = []
      const entry = { ...data, id: uuid().toString(), userid, favorited, rating, taste_tags: data.taste_tags, price: Number(data.price) }
      if (entry.other_taste_tags) delete entry.other_taste_tags
      if (entry.additional) delete entry.additional
      console.log("Formdata, obj:", entry);

      const res = GQLClient(ADD_ENTRY, { entry });
      console.log(res)
      chat.addRobotChatResponse('Alright, your entry has been saved! I\'ll redirect you to the entry page in a moment.')
      setTimeout(() => goToEntry(entry.origin_name, entry.id), 3000)
  };

  const editEntry = () => {}

  return (
    <form ref={ref} />
  )
}

export default ChatForm;
