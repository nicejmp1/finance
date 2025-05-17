'use client';
import { useResetPwForm } from '@/hooks/auth/useResetPwForm';


export default function ResetPasswordForm() {
    const {
        newPassword,
        confirmPassword,
        error,
        isLoading,
        handleSubmit,
        setNewPassword,
        setConfirmPassword,
    } = useResetPwForm();

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">비밀번호 재설정</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        새 비밀번호
                    </label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        비밀번호 확인
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer"
                >
                    {isLoading ? '처리 중...' : '비밀번호 변경'}
                </button>
            </form>
        </div>
    )
}
