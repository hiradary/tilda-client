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
}

export interface Address {
  _id: string
  name: string
  address: string
  createdBy: string
}

export interface Socials {
  instagram: string
  twitter: string
  website: string
}
