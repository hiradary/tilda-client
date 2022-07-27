import { GetServerSideProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"

import AddressCard from "modules/AddressCard"
import Layout from "components/Layout"
import List from "components/List"
import request from "utils/request"
import { withHttp } from "utils"
import { User, Address } from "types"
import { useAuth } from "hooks/useAuth"

interface Props {
  user: User
  addresses: Address[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query
  const { data } = await request.get(`/users/profile/${username}`)
  const user = {
    _id: data._id,
    email: data.email,
    fullname: data.fullname,
    username: data.username,
    socials: data.socials,
    bio: data.bio,
  }
  const addresses = data.addresses

  return {
    props: {
      user,
      addresses,
    },
  }
}

const Profile = ({ user, addresses }: Props) => {
  const router = useRouter()
  const authState = useAuth((state) => state.user)
  const isMine = authState._id === user._id

  return (
    <Layout title="User profile" description="Check out this user's profile.">
      <main className="w-full flex flex-col">
        <header className="w-full h-44 bg-blue-700 flex justify-center items-end mb-20">
          <div className="w-40 h-40 rounded-full border-white border-solid border-4 bg-rose-700 relative -bottom-20"></div>
        </header>
        <div className="w-full flex flex-col items-center mt-2">
          <h1 className="font-bold text-center text-4xl text-slate-900">
            {user.fullname}
          </h1>
          <h3 className="text-center text-slate-500">@{user.username}</h3>
          <p className="text-center text-slate-900 mt-4 max-w-xs">{user.bio}</p>
          <div className="flex items-center mt-2">
            {user.socials.twitter && (
              <a
                href={`https://twitter.com/${user.socials.twitter}`}
                className="flex items-center mx-2"
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="icon-twitter text-blue-500 mr-1"></span>
                <span>{user.socials.twitter}</span>
              </a>
            )}
            {user.socials.instagram && (
              <a
                href={`https://instagram.com/${user.socials.instagram}`}
                className="flex items-center mx-2"
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="icon-instagram text-pink-700 mr-1"></span>
                <span>{user.socials.instagram}</span>
              </a>
            )}
            {user.socials.website && (
              <a
                href={withHttp(user.socials.website)}
                className="flex items-center mx-2"
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="icon-globe text-blue-900 mr-1"></span>
                <span>{user.socials.website}</span>
              </a>
            )}
          </div>
          {isMine && (
            <div className="mt-4">
              <Link href="/editprofile">
                <a className="flex items-center text-sm text-slate-500 border p-2 py-1 rounded hover:text-white hover:border-slate-500 hover:bg-slate-500 transition">
                  <span className="icon-edit pr-2"></span>
                  Edit profile
                </a>
              </Link>
            </div>
          )}
        </div>

        <section className="w-full flex justify-center my-12">
          <div className="w-full max-w-2xl px-2">
            <h2 className="font-bold text-2xl mb-4">
              Crypto Addresses &nbsp;💸
            </h2>
            <List
              data={addresses}
              emptyListTextMessage="No address found!"
              renderItem={(item) => {
                return (
                  <div className="w-full mb-4" key={item._id}>
                    <AddressCard
                      isMine={isMine}
                      data={item}
                      onDelete={() => {
                        router.push(`/editprofile`)
                      }}
                    />
                  </div>
                )
              }}
            />
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default Profile
