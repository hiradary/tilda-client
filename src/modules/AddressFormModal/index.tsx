import Select from "react-select"

import ModalWrapper from "components/ModalWrapper"
import Input from "components/Input"
import Button from "components/Button"

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
]

const AddressFormModal = () => {
  return (
    <ModalWrapper>
      <div className="w-full h-full flex flex-col">
        <h3 className="font-bold text-slate-900 text-2xl mb-8 text-left">
          Add your crypto address &nbsp;🤑
        </h3>

        <form className="w-full flex flex-col">
          <div className="w-full mb-4">
            <Select options={options} />
          </div>

          <div className="w-full mb-8">
            <Input placeholder="Address" />
          </div>
          <Button type="submit" text="Submit" />
        </form>
      </div>
    </ModalWrapper>
  )
}

export default AddressFormModal
