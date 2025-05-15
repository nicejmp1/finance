'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/store/useAuth';

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    submit?: string;
}

export default function LoginForm() {
    const { isLoading } = useAuth();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }))
        }
    }
    
    return (
        <form action="">
            <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">아이디</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="이메일을 입력해주세요"
                    className={`mt-2 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                )}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-2">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    className={`mt-2 block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                    value={formData.password}   
                    onChange={handleChange}
                />
                {errors.password && (
                    <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
                )}
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
            >
                {isLoading ? '로그인 중...' : '로그인'}
            </button>
        </form>
    )
}
