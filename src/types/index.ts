export interface User {
  _id: string
  fullname?: string
  email?: string
  username?: string
}

export interface Network {
  _id: string
  name: string
  symbol: string
}

export interface Address {
  _id: string
  name: string
  address: string
  network: Network
  createdBy: string
}
