import { Socials } from "types"

export interface UpdateProfile {
  username?: string
  fullname?: string
  socials?: Socials
  bio?: string
}
