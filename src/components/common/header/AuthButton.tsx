'use client';

import { useAuth } from '@/lib/store/useAuth';
import { User } from '@/lib/types/auth';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AuthButtonProps {
    initialUser: User | null;
}

export function AuthButton({ initialUser }: AuthButtonProps) {
    const { user, logout, initializeUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (initialUser) {
            useAuth.setState({ user: initialUser });
        } else {
            initializeUser();
        }
        setIsLoading(false);
    }, [initialUser, initializeUser]);

    if (isLoading) {
        return null;
    }

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
        }
    };

    return (
        <div className="flex items-center gap-4">
            {user ? (
                <div className="flex items-center gap-4">
                    <span className="text-white">
                        {user.nickname}님 환영합니다
                    </span>
                    <button 
                        onClick={handleLogout} 
                        className="text-sm px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    >
                        로그아웃
                    </button>
                </div>
            ) : (
                    <div className="flex items-center gap-4">
                        <Link href="/auth/login/" className="text-sm px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">
                            로그인
                        </Link>
                        <Link href="/auth/signup" className="text-sm px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600">
                            회원가입
                    </Link>
                </div>
            )}
        </div>
    )
}
