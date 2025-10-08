import { create } from "zustand";

// const useBear = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }));

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthStore {
  user: User;
  setUser: (newUser: User) => void;
  reset: () => void;
}

// 스토어 예시
export const useAuthStore = create<AuthStore>((set) => ({
  user: {
    id: "",
    email: "",
    role: "",
  },

  setUser: (newUser: User) => set({ user: newUser }),

  reset: () => set({ user: { id: "", email: "", role: "" } }),
}));
