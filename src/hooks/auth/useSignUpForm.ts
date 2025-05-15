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
            await signUp(formData);
            router.push('/auth/login');
        } catch (error: unknown) {
            setErrors(prev => ({
                ...prev,
                submit: error instanceof Error ? error.message : '회원가입에 실패했습니다. 다시 시도해주세요.'
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

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = validateField(name as keyof FormData, value);
        setErrors(prev => ({
            ...prev,
            [name]: error || undefined
        }));
    }

    const handleShowPassword = (field: 'password' | 'checkpassword') => {
        if (field === 'password') {
            setShowPassword(!showPassword);   
        } else {
            setShowCheckPassword(!showCheckPassword);
        }
    }

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