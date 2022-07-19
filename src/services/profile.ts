import request from "utils/request"
import type { UpdateProfile } from "types/services/profile"

const profileService = {
  getMyProfile: () => {
    return new Promise((resolve, reject) => {
      request
        .get(`/users/profile`)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(reject)
    })
  },
  updateProfile: (updatedData: UpdateProfile) => {
    return new Promise((resolve, reject) => {
      request
        .put(`/users/profile`, updatedData)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(reject)
    })
  },
}

export default profileService
