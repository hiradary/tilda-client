export interface User {
  _id: string
  fullname?: string
  email?: string
  username?: string
  bio?: string
  socials?: {
    instagram: string
    twitter: string
    website: string
  }
  addresses: Address[]
}

export interface Address {
  _id: string
  name: string
  address: string
  crypto: Cryptocurrency
  createdBy: string
}

export interface Socials {
  instagram: string
  twitter: string
  website: string
}

export interface Cryptocurrency {
  _id: string
  name: string
  symbol: string
  logo: string
}
