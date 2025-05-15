'use client';

import LoginForm from '@/components/auth/login/LoginForm';  

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6">로그인</h1>
                <LoginForm />
            </div>
        </div>
    )
}