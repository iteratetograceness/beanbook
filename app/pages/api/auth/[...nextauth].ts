import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { LOGIN } from "../../../lib/queries"
import { initializeApollo } from "../../../lib/client"
import type { JWT } from "next-auth/jwt"

export default NextAuth({
  useSecureCookies: process.env.NODE_ENV === "production",
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
    secret: process.env.JWT_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: 'BeanBook',
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
        password: {  label: "password", type: "password" }
      },
      async authorize(credentials: Record<"username" | "password", string> | undefined | any, req) {
        
        const { username, password } = credentials
        const apolloClient = initializeApollo()

        const res = await apolloClient.mutate({
          mutation: LOGIN,
          variables: { username, password }
        })

        if (res?.data?.login?.authorized) {
          return {
            data: {
              user_id: res.data.login.user_id,
              firstname: res.data.login.firstname,
            },
            status: 'success'
          }
        } else {
          throw new Error('Invalid username or password')
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.user = {
          user_id: user.data.user_id,
          firstname: user.data.firstname,
        }
      }

      return token
    },
    async session({ session, token }: { session: any, token: JWT }) {
      session.user = token.user
      return session
    },
  },
})