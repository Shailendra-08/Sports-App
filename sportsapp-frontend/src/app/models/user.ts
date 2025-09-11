export interface User {
  id: string;
  fullName: string;
  email: string;
  username: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  age: number,
  bio: string
}

export interface LoginRequest {
  email: string;
  password: string;
}