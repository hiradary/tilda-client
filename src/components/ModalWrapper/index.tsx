import React, { useRef, MouseEvent } from "react"
import { Reoverlay } from "reoverlay"

interface Props {
  children: React.ReactNode
  onClose?: (event: MouseEvent) => null
  wrapperClassName?: string
  contentContainerClassName?: string
}

const ModalWrapper = ({
  children,
  onClose = () => Reoverlay.hideModal(),
  wrapperClassName = "",
  contentContainerClassName = "",
}: Props) => {
  const wrapperElement = useRef<HTMLDivElement>(null)

  const handleClose = (event: MouseEvent) => {
    onClose(event)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (event.target === wrapperElement.current) {
      handleClose(event)
    }
  }

  return (
    <div
      ref={wrapperElement}
      role="dialog"
      className={`w-full h-screen fixed inset-0 z-[999] flex items-center justify-center ${wrapperClassName}`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
      onClick={handleClickOutside}
    >
      <div
        className={`bg-white p-10 px-20 min-w-[40rem] rounded-lg ${contentContainerClassName}`}
      >
        {children}
      </div>
    </div>
  )
}

export default ModalWrapper
