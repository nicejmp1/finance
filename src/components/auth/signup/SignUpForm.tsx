'use client';
import { useSignUpForm} from '@/hooks/auth/useSignUpForm';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUpForm() {
    const {
        formData,
        errors,
        isLoading,
        showPassword,
        showCheckPassword,
        handleChange,
        handleSubmit,
        handleBlur,
        handleShowPassword
    } = useSignUpForm();
   
    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="이메일을 입력해주세요"
                    className={`mt-2 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                )}
            </div>
            <div>
                <label htmlFor="password" className='block text-sm font-medium text-gray-700 mt-2'>비밀번호</label>
                <div className='relative'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="비밀번호를 입력해주세요"
                        className={`mt-2 block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2 pr-10`}
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <button
                        type="button"
                        onClick={() => handleShowPassword('password')}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer'
                    >
                        {showPassword ? (
                            <FaEye className='w-5 h-5'/>
                        ) : (
                            <FaEyeSlash className='w-5 h-5'/>
                        )}
                    </button>
                </div>
                
                {errors.password && (
                    <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
                )}
            </div>
            <div>
                <label htmlFor="checkpassword" className='block text-sm font-medium text-gray-700 mt-2'>비밀번호 확인</label>
                <div className='relative'>
                    <input
                        type={showCheckPassword ? 'text' : 'password'}
                        id="checkpassword"
                        name="checkpassword"
                        placeholder="비밀번호를 입력해주세요"
                        className={`mt-2 block w-full rounded-md border ${errors.checkpassword ? 'border-red-500' : 'border-gray-300'} px-3 py-2 pr-10`}
                        value={formData.checkpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <button
                        type="button"
                        onClick={() => handleShowPassword('checkpassword')}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer'
                    >
                        {showCheckPassword ? (
                            <FaEye className='w-5 h-5'/>
                        ) : (
                            <FaEyeSlash className='w-5 h-5'/>
                        )}
                    </button>
                </div>
                {errors.checkpassword && (
                    <p className="mt-1 text-red-500 text-sm">{errors.checkpassword}</p>
                )}
            </div>
            <div>
                <label htmlFor="nickname" className='block text-sm font-medium text-gray-700 mt-2'>닉네임</label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    placeholder="닉네임을 입력해주세요"
                    className={`mt-2 block w-full rounded-md border ${errors.nickname ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                    value={formData.nickname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.nickname && (
                    <p className="mt-1 text-red-500 text-sm">{errors.nickname}</p>
                )}
            </div>

            <div>
                <label htmlFor="birthYear" className='block text-sm font-medium text-gray-700 mt-2'>생년월일</label>
                <input
                    type="number"
                    id="birthYear"
                    name="birthYear"
                    placeholder="생년월일을 입력해주세요"
                    className={`mt-2 block w-full rounded-md border ${errors.birthYear ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                    value={formData.birthYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.birthYear && (
                    <p className="mt-1 text-red-500 text-sm">{errors.birthYear}</p>
                )}
            </div>

            {errors.submit && (
                <div className="mt-1 text-red-500 text-sm text-center">
                    {errors.submit}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className={`button-submit ${isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
            >
                {isLoading ? '회원가입 중...' : '회원가입'}
            </button>
        </form>
    )
}

