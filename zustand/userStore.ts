import { create } from "zustand";

interface AuthStore {
  isLoggedIn: boolean;
  token: string;
  login: () => void;
  logout: () => void;
  setToken: (token: string) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: "",
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  setToken: (state: string) => set({ token: state }),
}));

export default useAuthStore;
