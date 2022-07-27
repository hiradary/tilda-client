import { FormEvent, useState } from "react"
import Select from "react-select"
import { toast } from "react-toastify"
import { Reoverlay } from "reoverlay"

import ModalWrapper from "components/ModalWrapper"
import Input from "components/Input"
import Button from "components/Button"
import { useResources } from "hooks/useResources"
import addressService from "services/address"

interface SelectOption {
  value: string
  label: string
}

const AddressFormModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [address, setAddress] = useState("")
  const [name, setName] = useState("")
  const [selectedCrypto, setSelectedCrypto] = useState<null | SelectOption>(
    null
  )
  const cryptocurrencies = useResources((state) => state.cryptocurrencies)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!selectedCrypto || !address) {
      toast.error("Please complete the form.")
      return
    }

    setIsLoading(true)

    const formData = {
      address,
      crypto_id: selectedCrypto.value,
      name,
    }

    addressService
      .createAddress(formData)
      .then(() => {
        toast.success("You have successfully added a new address!")
        Reoverlay.hideModal()
      })
      .catch(() => {
        toast.error("There's been a problem with adding your address.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <ModalWrapper>
      <div className="w-full h-full flex flex-col">
        <h3 className="font-bold text-slate-900 text-2xl mb-8 text-left">
          Add your crypto address &nbsp;🤑
        </h3>

        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <div className="w-full mb-4">
            <Select
              placeholder="Token/Coin"
              value={selectedCrypto}
              options={cryptocurrencies.map((item) => ({
                value: item._id,
                label: item.name,
              }))}
              onChange={setSelectedCrypto}
            />
          </div>

          <div className="w-full mb-4">
            <Input
              placeholder="Address"
              value={address}
              onChange={({ target: { value } }) => setAddress(value)}
            />
          </div>
          <div className="w-full mb-8">
            <Input
              placeholder="Address name (Optional)"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
            />
          </div>
          <Button type="submit" text="Submit" disabled={isLoading} />
        </form>
      </div>
    </ModalWrapper>
  )
}

export default AddressFormModal
