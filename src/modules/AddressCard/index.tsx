import Image from "next/image"
import { toast } from "react-toastify"

import Button from "components/Button"
import btcIcon from "assets/icons/crypto/btc.svg"
import { copyToClipboard } from "utils"
import { Address } from "types"

interface Props {
  onSend?: () => void
  data: Address
}

const AddressCard = ({ onSend = () => null, data }: Props) => {
  const copyAddressText = async () => {
    try {
      const { address } = data
      await copyToClipboard(address)
      toast.success("Copied!")
    } catch (err) {
      toast.error("There was an issue copying the address into the clipboard.")
    }
  }

  if (!data) return null

  return (
    <div
      className="w-full h-16 border border-dashed border-slate-300 rounded-lg flex items-center px-4"
      role="row"
    >
      <Image src={btcIcon} alt="Bitcoin" />
      <span role="cell" className="font-bold text-slate-900 ml-4">
        {"data.network.symbol"}
      </span>
      <p role="cell" className="flex-1 pl-8 whitespace-nowrap">
        {data.address}
      </p>
      <button role="cell" onClick={copyAddressText}>
        <span className="icon-copy text-2xl"></span>
      </button>
      <Button
        text="Send"
        className="w-auto border border-solid border-blue-900 bg-white px-3 ml-3 group hover:bg-blue-900"
        textClassName="!text-blue-900 group-hover:!text-white"
        onClick={onSend}
      />
    </div>
  )
}

export default AddressCard
