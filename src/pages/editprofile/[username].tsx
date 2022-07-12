import { useReducer } from "react"
import { Reoverlay } from "reoverlay"
import { GetServerSideProps } from "next"
import omit from "lodash.omit"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

import Layout from "components/Layout"
import Input from "components/Input"
import List from "components/List"
import Button from "components/Button"
import AddressCard from "modules/AddressCard"
import AddressFormModal from "modules/AddressFormModal"
import request from "utils/request"
import { User, Address, Socials } from "types"
import profileService from "services/profile"

interface Props {
  user: User
  addresses: Address[]
}

interface EditProfileFormFields {
  email: string
  fullname: string
  username: string
  socials: Socials
  bio: string
  isLoading: boolean
}

// Actions

interface SetLoading {
  type: "set_loading"
  payload: boolean
}

interface SetSocials {
  type: "set_socials"
  payload: Partial<Socials>
}

interface SetState {
  type: "set_state"
  payload: {
    [key: string]: string
  }
}

type EditProfileFormActions = SetLoading | SetSocials | SetState

// End Actions

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

const reducer = (
  state: EditProfileFormFields,
  action: EditProfileFormActions
) => {
  switch (action.type) {
    case "set_loading":
      return { ...state, isLoading: action.payload }
    case "set_socials":
      return { ...state, socials: { ...state.socials, ...action.payload } }
    case "set_state":
      return { ...state, ...action.payload }
    default:
      throw new Error()
  }
}

const EditProfile = ({ user, addresses }: Props) => {
  const { email, fullname, username, socials, bio } = user
  const initialState: EditProfileFormFields = {
    email: email || "",
    fullname: fullname || "",
    isLoading: false,
    username: username || "",
    socials: {
      instagram: socials.instagram || "",
      twitter: socials.twitter || "",
      website: socials.website || "",
    },
    bio: bio || "",
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const router = useRouter()

  const handleStateChange = (key: string, value: string) => {
    dispatch({ type: "set_state", payload: { [key]: value } })
  }

  const changeLoading = (loading: boolean) => {
    dispatch({ type: "set_loading", payload: loading })
  }

  const showAddressFormModal = () => {
    Reoverlay.showModal(AddressFormModal)
  }

  const handleSubmit = () => {
    changeLoading(true)
    const data: Omit<EditProfileFormFields, "isLoading" | "email"> = omit(
      state,
      ["isLoading", "email"]
    )

    profileService
      .updateProfile(data)
      .then(() => {
        toast.success(`You have successfully updated your profile!`)
        router.push(`/${data.username}`)
      })
      .catch(() => false)
      .finally(() => {
        changeLoading(false)
      })
  }

  return (
    <Layout
      title="Edit your profile"
      description="Here you can edit your profile."
    >
      <div className="w-full flex flex-col">
        <header className="w-full h-44 bg-blue-700 flex justify-center items-end mb-20">
          <div className="w-40 h-40 rounded-full border-white border-solid border-4 bg-rose-700 relative -bottom-20"></div>
        </header>

        <section className="w-full flex justify-center mt-10">
          <div className="w-full max-w-2xl px-2 flex flex-col">
            <h2 className="font-bold text-2xl text-slate-900 mb-1">
              Edit profile &nbsp;😎
            </h2>
            <p className="text-slate-500">
              Add your name, biography, socials, etc.
            </p>

            <form className="flex flex-col w-full mt-5">
              <Input
                placeholder="Fullname"
                value={state.fullname}
                onChange={({ target: { value } }) => {
                  handleStateChange("fullname", value)
                }}
              />
              <Input
                placeholder="Username"
                value={state.username}
                onChange={({ target: { value } }) => {
                  handleStateChange("username", value)
                }}
                containerClassName="my-4"
              />
              <Input
                placeholder="Twitter handle (@yourusername)"
                className="flex-1"
                icon={<span className="icon-twitter text-blue-500"></span>}
                value={state.socials.twitter}
                onChange={({ target: { value } }) => {
                  dispatch({ type: "set_socials", payload: { twitter: value } })
                }}
              />
              <Input
                placeholder="Instagram handle (@yourusername)"
                className="flex-1"
                icon={
                  <span className="icon-instagram text-pink-700 relative"></span>
                }
                containerClassName="my-4"
                value={state.socials.instagram}
                onChange={({ target: { value } }) => {
                  dispatch({
                    type: "set_socials",
                    payload: { instagram: value },
                  })
                }}
              />
              <Input
                placeholder="Website"
                className="flex-1"
                icon={<span className="icon-globe text-blue-900"></span>}
                type="url"
                value={state.socials.website}
                onChange={({ target: { value } }) => {
                  dispatch({ type: "set_socials", payload: { website: value } })
                }}
              />
              <Input
                placeholder="Bio"
                className="flex-1"
                isTextarea
                containerClassName="my-4"
                value={state.bio}
                onChange={({ target: { value } }) => {
                  handleStateChange("bio", value)
                }}
              />
              <Button
                text="Submit"
                type="submit"
                onClick={handleSubmit}
                disabled={state.isLoading}
              />
            </form>
          </div>
        </section>

        <section className="w-full flex justify-center mt-12 pb-8">
          <div className="w-full max-w-2xl px-2" role="table">
            <h2 className="font-bold text-2xl text-slate-900 mb-4">
              Crypto Addresses &nbsp;💸
            </h2>

            <List
              emptyListTextMessage="No address found!"
              data={[]}
              renderItem={(item, index) => {
                return (
                  <div className="w-full mb-4" key={index}>
                    <AddressCard data={null} />
                  </div>
                )
              }}
              ListEmptyComponent={
                <Button
                  text="Add address"
                  type="button"
                  className="mt-4 w-auto px-6"
                  onClick={showAddressFormModal}
                />
              }
            />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default EditProfile
