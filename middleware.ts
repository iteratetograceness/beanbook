import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

// Configuration: https://clerk.com/docs/nextjs/middleware
export default authMiddleware({
  publicRoutes: ['/'],
  afterAuth(auth, req) {
    if (req.nextUrl.pathname === '/' && auth.userId) {
      return NextResponse.redirect(new URL('/home', req.url))
    }
  },
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
