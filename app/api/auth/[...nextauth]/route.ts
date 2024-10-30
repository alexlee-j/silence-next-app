import NextAuth, { DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/db'
import bcrypt from 'bcrypt'

// 扩展 DefaultSession 接口以包含 role
declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string
            role: string
        } & DefaultSession['user']
    }

    interface User {
        role: string
    }
}

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null
                }

                const user = await prisma.users_info.findUnique({
                    where: { username: credentials.username },
                    include: {
                        users_pwd: true,
                        user_role: true,
                    },
                })

                if (!user || !user.users_pwd) {
                    return null
                }

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.users_pwd.hash_pwd
                )

                if (!isValid) {
                    return null
                }

                return {
                    id: user.user_id,
                    name: user.username,
                    role: user.user_role?.role || 'user',
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string
            }
            return session
        },
        async redirect({ url, baseUrl }) {
            // 如果 url 是相对路径（不包含协议和域名），将其转换为绝对路径
            if (url.startsWith('/')) {
                url = `${baseUrl}${url}`
            }

            // 如果 url 是登录页面或基础 URL，重定向到 dashboard
            if (url === baseUrl || url.startsWith(`${baseUrl}/login`)) {
                return `${baseUrl}/dashboard`
            }

            // 如果 url 以 baseUrl 开头，允许重定向
            if (url.startsWith(baseUrl)) {
                return url
            }

            // 对于其他情况，重定向到 dashboard
            return `${baseUrl}/dashboard`
        },
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
