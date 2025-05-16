import { useState } from "react";
import { useAuth } from "@/lib/store/useAuth";

export const useFindPwForm = () => {
    const [email, setEmail] = useState('');
    const {
        isLoading,
        error,
        isPasswordReset,
        resetPassword
    } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await resetPassword(email);
        } catch (error) {
            console.error('비밀번호 찾기 오류:', error);
        }
    };

    return {
        email,
        setEmail,
        isLoading,
        error,
        isPasswordReset,
        handleSubmit,
    };
};
