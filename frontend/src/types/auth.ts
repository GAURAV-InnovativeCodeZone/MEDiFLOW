// src/types/auth.ts

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  role: UserRole;
}

export interface RegisterRequest {
  email: string;
  password: string;
}