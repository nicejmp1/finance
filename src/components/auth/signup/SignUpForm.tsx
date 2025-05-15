'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/useAuth';

interface FormData {
    email: string;
    password: string;
    nickname: string;
    birthYear: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    nickname?: string;
    birthYear?: string;
    submit?: string;
}

export default function SignUpForm() {
    const router = useRouter();
    const { isLoading, signUp } = useAuth();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        nickname: '',
        birthYear: ''
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
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = '이메일을 입력해주세요';
        } else if (!formData.email.includes('@')) {
            newErrors.email = '올바른 이메일 형식이 아닙니다.';
        }

        if (!formData.password) {
            newErrors.password = '비밀번호를 입력해주세요';
        } else if (formData.password.length > 6 && formData.password.length < 12) {
            newErrors.password = '비밀번호는 6~12자 사이로 입력해주세요';
        } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
            newErrors.password = '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.';
        }

        if (!formData.nickname) {
            newErrors.nickname = '닉네임을 입력해주세요';
        }

        if (!formData.birthYear) {
            newErrors.birthYear = '생년월일을 입력해주세요';
        } else if (formData.birthYear.length !== 8) {
            newErrors.birthYear = '생년월일은 8자리로 입력해주세요';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await signUp(formData);
            router.push('/auth/login');
        } catch (error: unknown) {
            setErrors(prev => ({
                ...prev,
                submit: error instanceof Error ? error.message : '알 수 없는 오류'
            }));
        }
    };
        
   
    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
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
                <label htmlFor="password" className='block text-sm font-medium text-gray-700 mt-2'>비밀번호</label>
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
            <div>
                <label htmlFor="nickname" className='block text-sm font-medium text-gray-700 mt-2'>닉네임</label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    placeholder="닉네임을 입력해주세요"
                    className={`mt-2 block w-full rounded-md border ${errors.nickname ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                    value={formData.nickname}
                    onChange={handleChange}
                />
                {errors.nickname && (
                    <p className="mt-1 text-red-500 text-sm">{errors.nickname}</p>
                )}
            </div>
            <div>
                <label htmlFor="birthYear" className='block text-sm font-medium text-gray-700 mt-2'>생년월일</label>
                <input
                    type="number"
                    id="birthYear"
                    name="birthYear"
                    placeholder="생년월일을 입력해주세요"
                    className={`mt-2 block w-full rounded-md border ${errors.birthYear ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                    value={formData.birthYear}
                    onChange={handleChange}
                />
                {errors.birthYear && (
                    <p className="mt-1 text-red-500 text-sm">{errors.birthYear}</p>
                )}
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
            >
                {isLoading ? '회원가입 중...' : '회원가입'}
            </button>
        </form>
    )
}

