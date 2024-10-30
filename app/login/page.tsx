'use client'

import React, { Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import LoginForm from '../components/LoginForm'
import Footer from '@/app/components/Footer'
import { useToast } from '@/hooks/use-toast'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

interface LoginFormValues {
    username: string
    password: string
    remember?: boolean
}

const LoginContent = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { toast } = useToast()

    const onFinish = async (values: LoginFormValues) => {
        try {
            const callbackUrl = searchParams.get('from') || '/dashboard'
            const result = await signIn('credentials', {
                username: values.username,
                password: values.password,
                remember: values.remember ?? false,
                redirect: false,
                callbackUrl: callbackUrl.startsWith('http')
                    ? callbackUrl
                    : `${window.location.origin}${callbackUrl}`,
            })

            if (result?.error) {
                if (result.error === 'CredentialsSignin') {
                    toast({
                        title: '登录失败',
                        description: '用户名或密码错误，请重试',
                        variant: 'destructive',
                    })
                } else {
                    toast({
                        title: '登录失败',
                        description: '发生未知错误，请稍后重试',
                        variant: 'destructive',
                    })
                }
            } else if (result?.url) {
                toast({
                    title: '登录成功',
                    description: '欢迎回来！',
                })
                router.push(result.url)
            }
        } catch (error) {
            console.error('Login error:', error)
            toast({
                title: '登录错误',
                description: '登录过程中发生错误，请稍后重试',
                variant: 'destructive',
            })
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-yellow-300 via-pink-500 to-purple-600">
            <div className="flex-grow flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-white bg-opacity-90 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-4xl font-bold text-center text-purple-600">
                            欢迎回来
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-pink-500 mb-6 text-lg">
                            请登录您的账户
                        </p>
                        <LoginForm onFinish={onFinish} className="login-form" />
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-center text-gray-600">
                            还没有账号？
                            <Link
                                href="/register"
                                className="text-purple-600 hover:text-pink-500 ml-2 font-semibold transition duration-300"
                            >
                                立即注册
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
            <Footer className="bg-transparent text-white py-6" />
        </div>
    )
}

const LoginPage: React.FC = () => {
    return (
        <Suspense
            fallback={<div className="text-white text-2xl">Loading...</div>}
        >
            <LoginContent />
        </Suspense>
    )
}

export default LoginPage
