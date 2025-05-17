'use client';
import { useFindPwForm } from "@/hooks/auth/useFindPwForm";
import Link from "next/link";

export default function FindPwForm() {

    const {
        email,
        setEmail,
        isLoading,
        errors,
        isPasswordReset,
        handleSubmit,
        handleChange
    } = useFindPwForm();

    if (isPasswordReset) {
        return (
            <div className="text-center space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800">
                        이메일이 전송되었습니다.
                    </h3>
                    <p className="text-green-600 mt-2">
                        입력하신 이메일로 비밀번호 재설정 링크를 보내드렸습니다.
                        이메일을 확인해주세요.
                    </p>
                </div>
                <Link href="/auth/login" className="button-submit">
                    로그인 페이지로 이동
                </Link>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="label-text">이메일</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="이메일을 입력해주세요"
                    className={`input-text px-3 py-2`}
                    value={email}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
            </div>
            {errors.submit && <p className="mt-1 text-red-500 text-sm">{errors.submit}</p>}
            <button
                type="submit"
                className="button-submit"
                disabled={isLoading}
            >
                {isLoading ? '비밀번호 찾기 중...' : '비밀번호 찾기'}
            </button>
        </form>
    )
}