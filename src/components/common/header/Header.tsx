import { AuthButton } from "./AuthButton";
import { cookies } from "next/headers";
import { FaMoon } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
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
        <header className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-md">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-4 h-16 flex items-center justify-between">
                {/* 왼쪽: 네비게이션 메뉴 (서버에서 렌더링) */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-xl font-bold text-white hover:text-gray-200 transition-colors">
                        UI/UX ShowCase
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/components" className="text-white hover:text-gray-100 transition-colors">
                            Components
                        </Link>
                        <Link href="/layouts" className="text-white hover:text-gray-100 transition-colors">
                            Layouts
                        </Link>
                        <Link href="/animations" className="text-white hover:text-gray-100 transition-colors">
                            Animations
                        </Link>
                    </div>
                </div>

                {/* 오른쪽: 인증 버튼 (클라이언트에서 렌더링) */}
                <div className="flex items-center gap-3">
                    <button 
                        className="px-2 py-2 rounded-full bg-white text-white hover:bg-white/20 transition-colors cursor-pointer"
                        aria-label="테마 변경"    
                    >
                        <FaMoon className="w-6 h-6 text-amber-500" />
                    </button>
                    <a 
                        href="https://github.com/nicejmp1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-2 rounded-full bg-white text-white hover:bg-white/20 transition-colors"
                        >
                        <FaGithub className="w-6 h-6 text-black" />
                    </a>
                    <AuthButton initialUser={initialUser}/>
                </div>
            </nav>
        </header>
    )
}