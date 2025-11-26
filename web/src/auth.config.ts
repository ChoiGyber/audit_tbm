import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            const isOnAdmin = nextUrl.pathname.startsWith('/admin')

            if (isOnDashboard || isOnAdmin) {
                if (isLoggedIn) {
                    // Check admin access
                    if (isOnAdmin && auth.user.role !== 'ADMIN') {
                        return Response.redirect(new URL('/dashboard', nextUrl))
                    }
                    return true
                }
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                session.user.role = token.role as 'ADMIN' | 'USER'
            }
            return session
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string
                    password: string
                }

                if (!email || !password) {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: { email },
                })

                if (!user) {
                    return null
                }

                const passwordsMatch = await bcrypt.compare(password, user.password)

                if (!passwordsMatch) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                }
            },
        }),
    ],
} satisfies NextAuthConfig
