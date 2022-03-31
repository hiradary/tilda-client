interface Props {
  type?: "button" | "submit" | "reset"
  text: string
  className?: string
  textClassName?: string
  onClick?: () => void
  disabled?: boolean
}

const Button = ({
  type = "button",
  text,
  className = "",
  textClassName = "",
  onClick = () => null,
  disabled = false,
}: Props) => {
  return (
    <button
      type={type}
      className={`w-full h-10 flex justify-center items-center rounded-lg bg-blue-700 hover:bg-blue-800 transition disabled:bg-blue-900 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={`text-white ${textClassName}`}>{text}</span>
    </button>
  )
}

export default Button
