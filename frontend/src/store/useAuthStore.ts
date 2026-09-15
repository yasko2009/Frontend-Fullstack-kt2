import { create } from "zustand";
import api from "../api/client";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      set({
        token,
        isAuthenticated: true,
      });

      return true;
    } catch {
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      token: null,
      isAuthenticated: false,
    });
  },
}));