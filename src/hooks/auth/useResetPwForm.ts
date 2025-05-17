import { useState } from 'react';
import { useAuth } from '@/lib/store/useAuth';
import { useSearchParams, useRouter } from 'next/navigation';

interface FormData {
    password: string;
    checkpassword: string;
}

interface FormErrors {
    password?: string;
    checkpassword?: string;
    submit?: string;
}

export const useResetPwForm = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!token) {
            setError('유효하지 않은 토큰입니다.');
            return;
        }

        try {
            await resetPassword(token, newPassword);
            router.push('/auth/login?message=password-reset-success');
        } catch (error) {
            setError(error instanceof Error ? error.message : '비밀번호 재설정에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        newPassword,
        confirmPassword,
        error,
        isLoading,
        handleSubmit,
        setNewPassword,
        setConfirmPassword,
    }
}