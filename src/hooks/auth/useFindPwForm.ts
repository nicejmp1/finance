import { useState } from "react";
import { useAuth } from "@/lib/store/useAuth";

interface FormErrors {
    email?: string;
    submit?: string;
}

export const useFindPwForm = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const {
        isLoading,
        error,
        isPasswordReset,
        resetPassword
    } = useAuth();

    const validateEmail = (email: string) => {
        if (!email) {
            return '이메일을 입력해주세요.';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return '올바른 이메일 형식이 아닙니다.';
        }
        return '';
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        if (emailError) {
            setErrors({ email: emailError });
            return;
        }

        setErrors({});

        try {
            await resetPassword(email);
            if (error) {
                setErrors({ submit: error });
            }
        } catch (error) {
            console.error('비밀번호 찾기 오류:', error);
            setErrors({
                email: error instanceof Error ? error.message : '존재하지 않는 이메일 입니다.',
                submit: error instanceof Error ? error.message : '알 수 없는 오류'
            })
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrors({});
    }
    return {
        email,
        setEmail,
        isLoading,
        errors,
        isPasswordReset,
        handleSubmit,
        handleChange
    };
};
