import { initializeApollo } from './client';
import { SIGNUP } from './queries';
import { v1 as uuid } from 'uuid';

export const signUp = async (data) => {

  const variables = {
    ...data,
    user_id: uuid().toString()
  }

  const client = initializeApollo()

  const result = await client.mutate({
    mutation: SIGNUP,
    variables
  })

  if (result?.data?.signup?.validation) {
    return 'success'
  } else {
    return result.data.signup.message
  }
}