interface Props {
  type: "loading"
}

const StatusView = ({ type }: Props) => {
  switch (type) {
    case "loading":
      return (
        <div className="w-full h-full flex items-center justify-center">
          <p className="font-bold text-xl">Loading...</p>
        </div>
      )

    default:
      return null
  }
}

export default StatusView
