'use client';

import SignUpForm from '@/components/auth/signup/SignUpForm';

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6">회원가입</h1>
                <SignUpForm />
            </div>
        </div>
    );
}


