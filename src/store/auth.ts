import { User } from "firebase/auth";
import { create } from "zustand";

type LoginStatus = "initial" | "authenticated" | "unauthenticated";

interface AuthStore {
  isLogin: LoginStatus;
  user: User | null;
  actions: {
    setIsLogin: (isLogin: LoginStatus) => void;
    setUser: (user: User | null) => void;
  };
}

const useAuthStore = create<AuthStore>((set) => ({
  isLogin: "initial",
  user: null,
  actions: {
    setIsLogin: (isLogin) => set({ isLogin }),
    setUser: (user) => set({ user }),
  },
}));

export const useIsLogin = () => useAuthStore((state) => state.isLogin);
export const useUser = () => useAuthStore((state) => state.user);

export const useAuthActions = () => useAuthStore((state) => state.actions);
