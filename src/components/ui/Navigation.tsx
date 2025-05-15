'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="bg-slate-800 text-white">
            <div className="container mx-auto px-4">
                {/* flex justify-between을 추가하여 양쪽 정렬 */}
                <div className="flex justify-between h-16 items-center">
                    {/* 왼쪽 메뉴 그룹을 div로 감싸기 */}
                    <div className="flex space-x-4">
                        <Link
                            href="/"
                            className={`px-3 py-2 rounded-md ${
                                pathname === '/' ? 'bg-slate-600' : 'hover:bg-slate-700'
                            }`}
                        >
                            홈
                        </Link>

                        <Link
                            href="/dashboard"
                            className={`px-3 py-2 rounded-md ${
                                pathname === '/dashboard' ? 'bg-slate-600' : 'hover:bg-slate-700'
                            }`}
                        >
                            대시보드
                        </Link>

                        <Link
                            href="/transactions"
                            className={`px-3 py-2 rounded-md ${
                                pathname === '/transactions' ? 'bg-slate-600' : 'hover:bg-slate-700'
                            }`}
                        >
                            거래내역
                        </Link>
                    </div>

                    {/* 로그인 버튼은 별도로 분리 */}
                    <div className="flex space-x-4">
                        <Link
                            href="/auth/login"
                        className={`px-3 py-2 rounded-md ${
                            pathname === '/auth/login' ? 'bg-slate-600' : 'hover:bg-slate-700'
                        }`}
                        >
                            로그인
                        </Link>

                        <Link
                            href="/auth/signup"
                            className={`px-3 py-2 rounded-md ${
                                pathname === '/auth/signup' ? 'bg-slate-600' : 'hover:bg-slate-700'
                        }`}
                        >
                            회원가입
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}