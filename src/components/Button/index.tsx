interface Props {
  type?: "button" | "submit" | "reset"
  text: string
  className?: string
}

const Button = ({ type = "button", text, className = "" }: Props) => {
  return (
    <button
      type={type}
      className={`w-full h-10 flex justify-center items-center rounded-lg bg-blue-700 hover:bg-blue-800 transition${className}`}
    >
      <span className="text-white">{text}</span>
    </button>
  )
}

export default Button
