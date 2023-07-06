import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserDataObject
    accessToken: string
  }

  interface JWT {
    user: UserDataObject,
    accessToken: string,
    iat: number,
    exp: number,
    jti: string,
  }

  interface User {
    data: UserDataObject,
    status: string
  }
}

export interface UserDataObject {
  user_id: string,
  firstname: string
}

export interface LoginResponseObject {
  error: string | undefined
  status: number
  ok: boolean
  url: string | null
}


