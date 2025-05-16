import { AuthButton } from "./AuthButton";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Header() {
    
    let initialUser = null;
    if (typeof window !== 'undefined') {
        try {
            const cookieStore = await cookies();
            const session = cookieStore.get('session');

            if (session?.value && session.value !== "undefined") {
                try {
                    const parsedValue = JSON.parse(session.value);
                    if (parsedValue && typeof parsedValue === 'object') {
                        initialUser = parsedValue;
                    }
                } catch (parseError) {
                    console.error('Error parsing user data:', parseError);
                    cookieStore.delete('session');
                }
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    return (
        <header className="bg-slate-800 shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* 왼쪽: 네비게이션 메뉴 (서버에서 렌더링) */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-xl font-bold text-white">
                        Finance App
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-white hover:text-gray-900">
                            대시보드
                        </Link>
                        <Link href="/transactions" className="text-white hover:text-gray-900">
                            거래내역
                        </Link>
                        <Link href="/budget" className="text-white hover:text-gray-900">
                            예산관리
                        </Link>
                    </div>
                </div>

                {/* 오른쪽: 인증 버튼 (클라이언트에서 렌더링) */}
                <AuthButton initialUser={initialUser} />
            </nav>
        </header>
    )
}