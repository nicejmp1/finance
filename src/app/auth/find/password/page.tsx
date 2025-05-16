import FindPwForm from "@/components/auth/find/password/FindPwForm";
import { getPageMetadata } from "@/lib/metadata";

export default function FindPwPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6">비밀번호 찾기</h1>
                <FindPwForm />
            </div>
        </div>
    )
}