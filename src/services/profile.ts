import request from "utils/request"
import type { UpdateProfile } from "types/services/profile"

const profileService = {
  updateProfile: (updatedData: UpdateProfile) => {
    return new Promise((resolve, reject) => {
      request
        .put(`/users/profile`, updatedData)
        .then(({ data }) => {
          console.log({ data })
          resolve(data)
        })
        .catch(reject)
    })
  },
}

export default profileService
