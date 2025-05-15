import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export const useLoginForm = () => {
    const router = useRouter();
    const { isLoading, login } = useAuth();
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

    const validateField = (name: keyof FormData, value: string) => {
        switch (name) {
            case 'email':
                if (!value) {
                    return '이메일을 입력해주세요';
                } else if (!value.includes('@')) {
                    return '올바른 이메일 형식이 아닙니다.';
                }
                break;
        }
    }   

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Object.keys(formData).forEach(field => {
            const error = validateField(field as keyof FormData, formData[field as keyof FormData]);
            if (error) {
                setErrors(prev => ({
                    ...prev,
                    [field]: error
                }));
            }
        })

        const isFormComplete = Object.values(formData).every(value => value !== '');
        if (!isFormComplete) {
            setErrors(prev => ({
                ...prev,
                submit: '모든 필드를 입력해주세요'
            }))
            return;
        }

        try {
            await login(formData);
            router.push('/');
        } catch (error: unknown) {
            setErrors(prev => ({
                ...prev,
                submit: error instanceof Error ? error.message : '로그인에 실패했습니다. 다시 시도해주세요.'
            }))
        }
    }

    return {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit    
    }
}
