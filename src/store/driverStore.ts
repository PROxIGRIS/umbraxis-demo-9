import { create } from 'zustand';

interface DriverState {
  driverId: string | null;
  driverName: string | null;
  isAuthenticated: boolean;
  setDriver: (id: string, name: string) => void;
  logout: () => void;
}

export const useDriverStore = create<DriverState>((set) => ({
  driverId: typeof window !== 'undefined' 
    ? sessionStorage.getItem('driver_id')
    : null,
  driverName: typeof window !== 'undefined'
    ? sessionStorage.getItem('driver_name')
    : null,
  isAuthenticated: typeof window !== 'undefined'
    ? sessionStorage.getItem('driver_id') !== null
    : false,
  
  setDriver: (id: string, name: string) => {
    sessionStorage.setItem('driver_id', id);
    sessionStorage.setItem('driver_name', name);
    set({ driverId: id, driverName: name, isAuthenticated: true });
  },
  
  logout: () => {
    sessionStorage.removeItem('driver_id');
    sessionStorage.removeItem('driver_name');
    set({ driverId: null, driverName: null, isAuthenticated: false });
  },
}));