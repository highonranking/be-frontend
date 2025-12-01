import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'viewer';
  profile?: {
    title: string;
    bio: string;
    avatar: string;
    resume: string;
    githubUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    mediumUrl?: string;
  };
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: true }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null, isLoggedIn: false }),
}));
