import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Ensure the correct route for uploadthing is public (adjust if needed)
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/uploadthing(.*)'])
const isRootRoute = createRouteMatcher(['/'])

export default clerkMiddleware((auth, req) => {
  const { userId } = auth()

  // For users visiting the root route
  if (isRootRoute(req)) {
    // If the user isn't signed in, redirect to sign-in
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  // For all other routes, protect them unless they are public
  if (!isPublicRoute(req)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
