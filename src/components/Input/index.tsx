interface Props {
  type?: "text" | "password"
  placeholder?: string
  className?: string
}

const Input = ({ type = "text", placeholder = "", className = "" }: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full h-11 border border-solid border-slate-300 rounded-lg p-2 text-slate-900 ${className}`}
    />
  )
}

export default Input
