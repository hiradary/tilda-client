import { Reoverlay } from "reoverlay"

import Layout from "components/Layout"
import Input from "components/Input"
import List from "components/List"
import Button from "components/Button"
import AddressCard from "modules/AddressCard"
import AddressFormModal from "modules/AddressFormModal"

const EditProfile = () => {
  const showAddressFormModal = () => {
    Reoverlay.showModal(AddressFormModal)
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
              <Input placeholder="Fullname" />
              <Input placeholder="Username" containerClassName="my-4" />
              <Input
                placeholder="Twitter handle (@yourusername)"
                className="flex-1"
                icon={<span className="icon-twitter text-blue-500"></span>}
              />
              <Input
                placeholder="Instagram handle (@yourusername)"
                className="flex-1"
                icon={
                  <span className="icon-instagram text-pink-700 relative"></span>
                }
                containerClassName="my-4"
              />
              <Input
                placeholder="Website"
                className="flex-1"
                icon={<span className="icon-globe text-blue-900"></span>}
                type="url"
              />
              <Input
                placeholder="Bio"
                className="flex-1"
                isTextarea
                containerClassName="my-4"
              />
              <Button text="Submit" type="submit" />
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
