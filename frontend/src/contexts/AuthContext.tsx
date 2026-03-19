import {createContext} from 'react';
import type { User } from '../types';

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshUser: () => Promise<void>; // Add refreshUser method
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

