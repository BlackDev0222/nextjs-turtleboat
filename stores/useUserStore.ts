import { User } from '@/types/user.type';
import { create } from 'zustand';

export interface UserState {
  user: User,
  setUser: (userData: User) => void,
}

const userStore = create<UserState>((set) => ({
  user: {},
  setUser: (userData: User) => set((state) => ({ user: userData }))
}));

export default userStore;