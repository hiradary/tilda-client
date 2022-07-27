import { User } from "types"
import create from "zustand"

interface UseAuth {
  user: User
  setUser: (userData: User) => void
}

export const useAuth = create<UseAuth>((set) => ({
  user: {
    _id: "",
    email: "",
    fullname: "",
    username: "",
    bio: "",
    socials: {
      instagram: "",
      twitter: "",
      website: "",
    },
    addresses: [],
  },

  setUser: (user) => set(() => ({ user })),
}))
