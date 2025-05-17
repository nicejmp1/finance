import ResetPasswordForm from "@/components/auth/reset-password/ResetPasswordForm";

export default function ResetPasswordPage() {
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">비밀번호 재설정</h1>
            <ResetPasswordForm />
        </div>
    )
}