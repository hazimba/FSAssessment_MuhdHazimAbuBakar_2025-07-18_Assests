import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserLoggedInState {
  role: string | null;
  setRole: (role: string | null) => void;
  loggedInUser: string | null;
  setLoggedInUser: (user: string | null) => void;
}

// export const useUserLoggedInState = create<UserLoginState>((set) => ({
//   user: null,
//   setRole: (user) => set({ user }),
// }));

export const useUserLoggedInState = create<UserLoggedInState>()(
  persist(
    (set) => ({
      role: null,
      setRole: (role) => set({ role }),

      loggedInUser: null,
      setLoggedInUser: (user) => set({ loggedInUser: user }),
    }),
    {
      name: "user-login-storage",
    }
  )
);
