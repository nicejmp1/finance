import { create } from 'zustand';  
import { SignUpData, User, LoginData } from '../types/auth';

interface AuthState {
  user: null | User;
  isLoading: boolean;
  error: string | null;
  signUp: (data: SignUpData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  initializeUser: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  
  initializeUser: () => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          set({ user, isLoading: false });
        } catch {
          set({ user: null, isLoading: false });
        }
      } else {
        set ({ isLoading: false })
      }
    }
  },

  signUp: async (data) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '회원가입에 실패했습니다.');
      }
      
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

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      document.cookie = `session=${JSON.stringify(responseData.session)}; path=/;`;
      localStorage.setItem('user', JSON.stringify(responseData.user));
      set ({ user: responseData.user, error: null });
    } catch (error: unknown) {
      set({ error: error instanceof Error ? error.message : '알 수 없는 오류' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('로그아웃에 실패했습니다.');
      }

      localStorage.removeItem('user');
      set({ user: null, error: null });

    } catch (error: unknown) {
      set({ error: error instanceof Error ? error.message : '알 수 없는 오류' });
    } finally {
      set({ isLoading: false });
    }
  }
}));
