import React from "react"

interface Props {
  type?: "text" | "password" | "url" | "email"
  placeholder?: string
  className?: string
  icon?: React.ReactNode
  containerClassName?: string
  isTextarea?: boolean
  textareaClassName?: string
  disabled?: boolean
  value?: string
  name?: string
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

const Input = ({
  type = "text",
  placeholder = "",
  className = "",
  name = "",
  icon = null,
  containerClassName = "",
  isTextarea = false,
  textareaClassName = "",
  disabled = false,
  value = "",
  onChange = () => null,
}: Props) => {
  return (
    <div className={`w-full relative flex items-center ${containerClassName}`}>
      {icon ? <div className="absolute left-3">{icon}</div> : null}
      {isTextarea ? (
        <textarea
          className={`w-full min-h-[7.5rem] border border-solid border-slate-300 rounded-lg p-2 text-slate-900 ${textareaClassName}`}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          value={value}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full h-11 border border-solid border-slate-300 rounded-lg p-2 text-slate-900 disabled:bg-slate-100 disabled:opacity-60 ${
            icon ? "pl-9" : ""
          } ${className}`}
          disabled={disabled}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  )
}

export default Input
