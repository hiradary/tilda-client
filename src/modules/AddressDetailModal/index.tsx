import Image from "next/image"
import QRCode from "qrcode.react"
import { toast } from "react-toastify"

import ModalWrapper from "components/ModalWrapper"
import Input from "components/Input"
import btcIcon from "assets/icons/crypto/btc.svg"
import { convertRemToPixels, copyToClipboard } from "utils"

const AddressDetailModal = () => {
  const copyAddressText = async () => {
    try {
      await copyToClipboard("TMDE...")
      toast.success("Copied!")
    } catch (err) {
      toast.error("There was an issue copying the address into the clipboard.")
    }
  }

  return (
    <ModalWrapper>
      <div className="w-full h-full flex flex-col">
        <header className="w-full flex items-center">
          <Image
            src={btcIcon}
            alt="Bitcoin"
            width={convertRemToPixels(1.5)}
            height={convertRemToPixels(1.5)}
          />
          <h3 className="font-bold text-slate-900 text-2xl text-left ml-2">
            Send Bitcoin (BTC)
          </h3>
        </header>

        <div className="w-full my-8 flex justify-center">
          <QRCode value="https://hiradary.me" />
        </div>

        <div className="w-full flex items-center justify-end relative">
          <Input value="bc1qperxj05jttjcdujskxkn244jrk55n70wyla2rl" disabled />
          <button className="absolute z-10 right-2" onClick={copyAddressText}>
            <span className="icon-copy text-2xl text-slate-900 align-bottom"></span>
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default AddressDetailModal
