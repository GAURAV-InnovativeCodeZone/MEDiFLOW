import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type{ UserRole } from '../types/auth';

interface AuthState {
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;

  setAuth: (token: string, role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      isAuthenticated: false,

      setAuth: (token, role) =>
        set({
          token,
          role,
          isAuthenticated: true,
        }),

      logout: () => {
        localStorage.removeItem("mediflow-auth");
        set({
          token: null,
          role: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'mediflow-auth',
    }
  )
);