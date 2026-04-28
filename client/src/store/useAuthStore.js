import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('nexus_user')) || null,
  
  login: (userData) => {
    localStorage.setItem('nexus_user', JSON.stringify(userData));
    set({ user: userData });
  },
  
  logout: () => {
    // 1. Local storage se data uda do
    localStorage.removeItem('nexus_user');
    // 2. State ko null kar do
    set({ user: null });
    // 3. NUCLEAR OPTION: Page ko force refresh kar do taaki koi memory na bache
    window.location.href = '/auth';
  },
}));

export default useAuthStore;
