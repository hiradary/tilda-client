import { Reoverlay } from "reoverlay"
import { GetServerSideProps } from "next"

import AddressCard from "modules/AddressCard"
import AddressDetailModal from "modules/AddressDetailModal"
import Layout from "components/Layout"
import List from "components/List"
import request from "utils/request"
import { User } from "types"

interface Props {
  user: User
  addresses: any[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query
  const { data } = await request.get(`/users/profile/${username}`)
  const user = {
    _id: data._id,
    email: data.email,
    name: data.name,
    username: data.username,
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
  console.log({ user, addresses })
  const showAddressDetailModal = () => {
    Reoverlay.showModal(AddressDetailModal)
  }

  return (
    <Layout title="User profile" description="Check out this user's profile.">
      <main className="w-full flex flex-col">
        <header className="w-full h-44 bg-blue-700 flex justify-center items-end mb-20">
          <div className="w-40 h-40 rounded-full border-white border-solid border-4 bg-rose-700 relative -bottom-20"></div>
        </header>
        <div className="w-full flex flex-col items-center mt-2">
          <h1 className="font-bold text-center text-4xl text-slate-900">
            {user.name}
          </h1>
          <h3 className="text-center text-slate-500">@{user.username}</h3>
          <p className="text-center text-slate-900 mt-4 max-w-xs">
            Front-End Developer @digikalacom
          </p>
          <div className="flex items-center mt-2">
            <a
              href="https://twitter.com/hiradary"
              className="flex items-center mx-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="icon-twitter text-blue-500 mr-1"></span>
              <span>hiradary</span>
            </a>
            <a
              href="https://instagram.com/hiradary"
              className="flex items-center mx-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="icon-instagram text-pink-700 mr-1"></span>
              <span>hiradary</span>
            </a>
            <a
              href="https://hiradary.me"
              className="flex items-center mx-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="icon-globe text-blue-900 mr-1"></span>
              <span>hiradary.me</span>
            </a>
          </div>
        </div>

        <section className="w-full flex justify-center my-12">
          <div className="w-full max-w-2xl px-2">
            <h2 className="font-bold text-2xl mb-4">
              Crypto Addresses &nbsp;💸
            </h2>
            <List
              data={[]}
              emptyListTextMessage="No address found!"
              renderItem={(item, index) => {
                return (
                  <div className="w-full mb-4" key={item}>
                    <AddressCard onSend={showAddressDetailModal} />
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
