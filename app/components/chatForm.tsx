import { useRef, useEffect } from 'react'
import { ConversationalForm } from 'conversational-form'
import { useGQLClient } from '../lib/graphqlClient'
import { gql } from 'graphql-request'
import { v1 as uuid } from 'uuid'
import { useSession } from 'next-auth/react'

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
        preventAutoFocus: true
      },
      tags: fields
    })

    ref.current.appendChild(chat.el)

    return () => chat.remove()

  }, [])

  const addNewEntry = () => {
      const userid = session?.user.user_id
      const data = chat.getFormData(true)
      const favorited = data.favorited === 'true'
      const rating = Number(data.rating[0])
      delete data.additional
      const entry = { ...data, id: uuid().toString(), userid, favorited };
      console.log("Formdata, obj:", entry);

      // const data = useGQLClient(ADD_ENTRY, { entry });
      // console.log(data)
      chat.addRobotChatResponse("You are done. Check the dev console for form data output.")
  };

  const editEntry = () => {}

  return (
    <form ref={ref} />
  )
}

export default ChatForm;
