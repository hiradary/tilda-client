import request from "utils/request"
import { Cryptocurrency } from "types"

const resourcesService = {
  getCryptocurrencies: (): Promise<Cryptocurrency[]> => {
    return new Promise((resolve, reject) => {
      request
        .get("/resources/cryptocurrencies")
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}

export default resourcesService
