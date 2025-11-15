import { create } from 'zustand';

interface AdminState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAuthenticated: typeof window !== 'undefined' 
    ? sessionStorage.getItem('admin_authenticated') === 'true'
    : false,
  
  login: (username: string, password: string) => {
    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem('admin_authenticated', 'true');
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
  
  logout: () => {
    sessionStorage.removeItem('admin_authenticated');
    set({ isAuthenticated: false });
  },
}));