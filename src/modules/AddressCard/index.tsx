import Image from "next/image"
import { toast } from "react-toastify"

import Button from "components/Button"
import { copyToClipboard } from "utils"
import { Address } from "types"

interface Props {
  onSend?: () => void
  data: Address
  isMine: boolean
}

const AddressCard = ({ onSend = () => null, data, isMine = false }: Props) => {
  const copyAddressText = async () => {
    try {
      const { address } = data
      await copyToClipboard(address)
      toast.success("Copied!")
    } catch (err) {
      toast.error("There was an issue copying the address into the clipboard.")
    }
  }

  const deleteAddress = () => {}

  if (!data) return null

  return (
    <div className="w-full h-16 border border-dashed border-slate-300 rounded-lg flex items-center px-4">
      <Image
        src={data.crypto.logo}
        width="24"
        height="24"
        alt={data.crypto.name}
      />
      <span className="font-bold text-slate-900 ml-4">
        {data.crypto.symbol}
      </span>
      <p className="flex-1 pl-8 whitespace-nowrap">{data.address}</p>
      {isMine && (
        <button title="Delete address" onClick={deleteAddress}>
          <span className="icon-remove text-2xl text-red-600"></span>
        </button>
      )}
      <button title="Copy address" onClick={copyAddressText} className="mx-3">
        <span className="icon-copy text-2xl"></span>
      </button>
      <Button
        text="Send"
        className="w-auto border border-solid border-blue-900 bg-white px-3 group hover:bg-blue-900"
        textClassName="!text-blue-900 group-hover:!text-white"
        onClick={onSend}
      />
    </div>
  )
}

export default AddressCard
