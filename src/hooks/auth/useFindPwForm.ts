import { useState } from "react";

interface FormData {
    email: string;
}

export const useFindPwForm = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors(null);

        try {
            const response = await fetch('/api/auth/find-pw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
        } catch (errors) {
            console.error('비밀번호 찾기 오류:', errors);
            setErrors('비밀번호 찾기 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };
    return {
        email,
        isLoading,
        errors,
        handleSubmit,
        setEmail,
    }
    
}