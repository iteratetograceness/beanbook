import { GQLClient } from './graphqlClient';
import { SIGNUP } from './queries';
import { v1 as uuid } from 'uuid';

export const signUp = async (data) => {

  const variables = {
    ...data,
    user_id: uuid().toString()
  }

  const { signup } = await GQLClient(SIGNUP, variables);

  if (signup?.validation) {
    return 'success'
  } else {
    return signup.message
  }
}