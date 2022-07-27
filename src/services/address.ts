import request from "utils/request"
import type { CreateAddress } from "types/services/address"

const addressService = {
  createAddress: (data: CreateAddress) => {
    return new Promise((resolve, reject) => {
      request
        .post("/users/addresses", data)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(reject)
    })
  },
}

export default addressService
