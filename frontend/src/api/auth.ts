// authentication API calls
import { apiClient } from "./client";
import { AxiosError } from "axios";
import type { AuthCredentials, RegisterCredentials } from "../types"; // Import new types

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown authentication error occurred.";
};

export const authApi = {
  login: async (credentials: AuthCredentials) => {
    try {
      const res = await apiClient.post("/auth/login", credentials);
      return res.data; // {token,user}
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error));
    }
  },
  register: async (userData: RegisterCredentials) => {
    try {
      const res = await apiClient.post("/auth/register", userData);
      return res.data;
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error));
    }
  },
};
