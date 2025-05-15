import { SignUpData } from "../types/auth";

export const validateSignUp = (data: SignUpData) => {
  const errors: Record<string, string> = {};

  if (!data.email?.includes('@')) {
    errors.email = '올바른 이메일 주소를 입력해주세요';
  }

  if (data.password?.length < 6) {
    errors.password = '비밀번호는 6자 이상이어야 합니다';
  }

  if (data.nickname?.length < 2) {
    errors.nickname = '닉네임은 2자 이상이어야 합니다';
  }

  return errors;
};
