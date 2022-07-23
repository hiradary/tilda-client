import ModalWrapper from "components/ModalWrapper"
import Input from "components/Input"
import Button from "components/Button"

const AddressFormModal = () => {
  return (
    <ModalWrapper>
      <div className="w-full h-full flex flex-col">
        <h3 className="font-bold text-slate-900 text-2xl mb-8 text-left">
          Add your crypto address &nbsp;🤑
        </h3>

        <form className="w-full flex flex-col">
          <div className="w-full mb-4">
            <Input placeholder="Name; e.g My USDT (TRC-20) address" />
          </div>

          <div className="w-full mb-8">
            <Input placeholder="Crypto address" />
          </div>
          <Button type="submit" text="Submit" />
        </form>
      </div>
    </ModalWrapper>
  )
}

export default AddressFormModal
