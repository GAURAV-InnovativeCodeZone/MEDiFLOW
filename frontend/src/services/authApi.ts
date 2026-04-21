import { api } from './api';
import type { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Login failed" };
    }
  },

  register: async (credentials: RegisterRequest): Promise<{ message: string }> => {
    try {
      const response = await api.post<{ message: string }>('/auth/register', credentials);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Registration failed" };
    }
  },
};