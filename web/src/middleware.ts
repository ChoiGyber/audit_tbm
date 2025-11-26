import { authConfig } from './auth.config'
import NextAuth from 'next-auth'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { pathname } = req.nextUrl

    // Public paths
    const publicPaths = ['/', '/login', '/register']
    const isPublicPath = publicPaths.includes(pathname)

    // Redirect logged-in users away from auth pages
    if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
        return Response.redirect(new URL('/dashboard', req.url))
    }

    // Protect dashboard and admin routes
    if (!isLoggedIn && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
        return Response.redirect(new URL('/login', req.url))
    }

    // Admin-only routes
    if (pathname.startsWith('/admin') && req.auth?.user?.role !== 'ADMIN') {
        return Response.redirect(new URL('/dashboard', req.url))
    }

    return
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
