import { create } from "zustand";

const userAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
  isLoggedIn: () => {
    return userAuthStore.getState().user !== null;
  },
}));

export default userAuthStore;
