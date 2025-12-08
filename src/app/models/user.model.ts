export type UserRole = 'admin' | 'user'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  active: boolean
  createdAt: string
}

export interface UserFormData {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
  active: boolean | null;
}

export interface UserCreateDto {
  name: string | null;
  email: string | null;
  role: string | null;
  active: boolean | null;
}

export interface UserUpdateDto {
  name?: string | null;
  email?: string | null;
  role?: string | null;
  active?: boolean | null;
}