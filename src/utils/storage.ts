const storage = {
  set: (key: string, value: string) => {
    if (typeof window === "undefined") return
    localStorage.setItem(key, value)
  },

  get: (key) => {
    if (typeof window === "undefined") return
    return localStorage.getItem(key) || ""
  },
}

export default storage
