import { useReducer, useEffect } from "react"
import { Reoverlay } from "reoverlay"
import omit from "lodash.omit"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

import Layout from "components/Layout"
import Input from "components/Input"
import List from "components/List"
import Button from "components/Button"
import AddressCard from "modules/AddressCard"
import AddressFormModal from "modules/AddressFormModal"
import { User, Socials, Address } from "types"
import profileService from "services/profile"
import { useAuth } from "hooks/useAuth"
import addressService from "services/address"

interface EditProfileFormFields extends User {
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
  payload: Partial<User>
}

type EditProfileFormActions = SetLoading | SetSocials | SetState

// End Actions

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

const EditProfile = () => {
  const user = useAuth((state) => state.user)
  const setAddresses = useAuth((state) => state.setAddresses)
  const initialState: EditProfileFormFields = {
    ...user,
    isLoading: false,
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

  const deleteAddress = (address_id: string) => {
    addressService
      .deleteAddress(address_id)
      .then(() => {
        toast.success(`You have successfully deleted this address!`)
        addressService
          .getAddresses()
          .then(({ addresses }: { addresses: Address[] }) => {
            setAddresses(addresses)
          })
      })
      .catch(() => {
        toast.error("There's been a problem deleting your address")
      })
  }

  useEffect(() => {
    dispatch({ type: "set_state", payload: user })
  }, [user])

  console.log({ user })

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
                placeholder="Email"
                value={state.email}
                onChange={({ target: { value } }) => {
                  handleStateChange("email", value)
                }}
                containerClassName="mb-4"
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
          <div className="w-full max-w-2xl px-2">
            <h2 className="font-bold text-2xl text-slate-900 mb-4">
              Crypto Addresses &nbsp;💸
            </h2>

            <List
              emptyListTextMessage="No address found!"
              data={user.addresses}
              renderItem={(item, index) => {
                return (
                  <div className="w-full mb-4" key={index}>
                    <AddressCard
                      isMine
                      data={item}
                      onDelete={() => deleteAddress(item._id)}
                    />
                  </div>
                )
              }}
            />

            <Button
              text="Add address"
              type="button"
              className="mt-4 w-full px-6"
              onClick={showAddressFormModal}
            />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default EditProfile
