'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface LoginFormValues {
    username: string
    password: string
    remember?: boolean
}

interface LoginFormProps {
    onFinish: (values: LoginFormValues) => void
    className?: string
}

const LoginForm: React.FC<LoginFormProps> = ({ onFinish, className }) => {
    const { register, handleSubmit } = useForm<LoginFormValues>()

    return (
        <form
            onSubmit={handleSubmit(onFinish)}
            className={`space-y-6 ${className}`}
        >
            <div className="space-y-2">
                <Label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                >
                    用户名
                </Label>
                <Input
                    id="username"
                    {...register('username', { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="请输入用户名"
                />
            </div>
            <div className="space-y-2">
                <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                >
                    密码
                </Label>
                <Input
                    id="password"
                    type="password"
                    {...register('password', { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="请输入密码"
                />
            </div>
            <div className="flex items-center">
                <Checkbox id="remember" {...register('remember')} />
                <Label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-600 cursor-pointer"
                >
                    记住我
                </Label>
            </div>
            <Button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
                登录
            </Button>
        </form>
    )
}

export default LoginForm
