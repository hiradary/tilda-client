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
  getAddresses: () => {
    return new Promise((resolve, reject) => {
      request
        .get("/users/addresses")
        .then(({ data }) => {
          resolve(data)
        })
        .catch(reject)
    })
  },
  deleteAddress: (address_id: string) => {
    return new Promise((resolve, reject) => {
      request
        .delete(`/users/addresses/${address_id}`)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(reject)
    })
  },
}

export default addressService
