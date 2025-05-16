'use client';
import { useFindPwForm } from "@/hooks/auth/useFindPwForm";

export default function FindIdForm() {

    const { 
        email,
        setEmail,
        isLoading,
        errors,
        handleSubmit 
    } = useFindPwForm();

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
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
                {errors && <p className="mt-1 text-red-500 text-sm">{errors}</p>}
            </div>
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