import { authApi } from "../api/auth";
import type { User } from "../types/index";


export const loginApi = async (email: string, password: string): Promise<string> => {
  const response = await authApi.login({ email, password });
  localStorage.setItem("token", response.token);
  return response.token;
};

export const registerApi = async (email: string, password: string, name: string): Promise<{ token: string; user: User }> => {
  const response = await authApi.register({ email, password, name });
  localStorage.setItem("token", response.token);
  return response;
};

export const logoutApi = (): void => {
  localStorage.removeItem("token");
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};
