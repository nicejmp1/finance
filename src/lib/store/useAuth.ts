import { create } from 'zustand';  
import { SignUpData, User, LoginData } from '../types/auth';

interface AuthState {
  user: null | User;
  isLoading: boolean;
  error: string | null;
  signUp: (data: SignUpData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  signUp: async (data) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('회원가입에 실패했습니다');
      
      const user = await response.json();
      set({ user, error: null });
    } catch (error: unknown) {
      set({ error: error instanceof Error ? error.message : '알 수 없는 오류' });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('로그인에 실패했습니다');

      const user = await response.json();
      set({ user, error: null });
    } catch (error: unknown) {
      set({ error: error instanceof Error ? error.message : '알 수 없는 오류' });
    } finally {
      set({ isLoading: false });
    }
  }
}));
