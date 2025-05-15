import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/useAuth';

interface FormData {
    email: string;
    password: string;
    checkpassword: string;
    nickname: string;
    birthYear: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    checkpassword?: string;
    nickname?: string;
    birthYear?: string;
    submit?: string;
}

export const useSignUpForm = () => {
    const router = useRouter();
    const { isLoading, signUp } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showCheckPassword, setShowCheckPassword] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',   
        checkpassword: '',
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
                [name]: undefined,
                submit: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let hasErrors = false;
        Object.keys(formData).forEach(field => {
            const error = validateField(field as keyof FormData, formData[field as keyof FormData]);
            if (error) {
                setErrors(prev => ({
                    ...prev,
                    [field]: error
                }));
                hasErrors = true;
            }
        });

        if (hasErrors) return;

        const emailExists = await checkDuplicate('email', formData.email);
        const nicknameExists = await checkDuplicate('nickname', formData.nickname);

        if (emailExists || nicknameExists) return;

        try {
            await signUp(formData);
            router.push('/auth/login');
        } catch (error: unknown) {
            setErrors(prev => ({
                ...prev,
                submit: error instanceof Error ? error.message : '회원가입에 실패했습니다.'
            }));
        }
    };

    const validateField = (name: keyof FormData, value: string) => {
        switch (name) {
            case 'email':
                if (!value) {
                    return '이메일을 입력해주세요';
                } else if (!value.includes('@')) {
                    return '올바른 이메일 형식이 아닙니다.';
                } 
                break;
            
            case 'password':
                if (!value) {
                    return '비밀번호를 입력해주세요';
                } else if (value.length > 6 && value.length < 12) {
                    return '비밀번호는 6~12자 사이로 입력해주세요';
                } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
                    return '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.';
                }
                break;
            
            case 'checkpassword':
                if (!value) {
                    return '비밀번호를 입력해주세요';
                } else if (value !== formData.password) {
                    return '비밀번호가 일치하지 않습니다.';
                }
                break;
            
            case 'nickname':
                if (!value) {
                    return '닉네임을 입력해주세요';
                }
                break;
            
            case 'birthYear':
                if (!value) {
                    return '생년월일을 입력해주세요';
                } else if (value.length !== 8) {
                    return '생년월일은 8자리로 입력해주세요';
                } else if (value.length === 8 && value.slice(0, 4) < '1800' || value.slice(0, 4) > '2025') {
                    return '생년월일이 올바르지 않습니다.';
                } else if (value.length === 8 && value.slice(4, 6) < '01' || value.slice(4, 6) > '12') {
                    return '생년월일이 올바르지 않습니다.';
                } else if (value.length === 8 && value.slice(6, 8) < '01' || value.slice(6, 8) > '31') {
                    return '생년월일이 올바르지 않습니다.';
                }
                break;
            
            default:
                return null;
        }
        return '';
    }

    const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        const error = validateField(name as keyof FormData, value);
        if (error) {
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
            return;
        }

        if ((name === 'email' || name === 'nickname') && value) {
            await checkDuplicate(name as 'email' | 'nickname', value);
        }
    };

    const handleShowPassword = (field: 'password' | 'checkpassword') => {
        if (field === 'password') {
            setShowPassword(!showPassword);   
        } else {
            setShowCheckPassword(!showCheckPassword);
        }
    }

    const checkDuplicate = async (field: 'email' | 'nickname', value: string) => {
        try {
            const response = await fetch('/api/auth/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ field, value })
            });

            const data = await response.json();
            
            if (data.exists) {
                setErrors(prev => ({
                    ...prev,
                    [field]: data.message
                }));
                return true;
            }
            return false;
        } catch {
            setErrors(prev => ({
                ...prev,
                [field]: '중복 확인 중 오류가 발생했습니다.'
            }));
            return true;
        }
    };

    return {
        formData,
        errors,
        isLoading,
        showPassword,
        showCheckPassword,
        handleChange,
        handleSubmit,
        handleBlur,
        handleShowPassword
    }
}