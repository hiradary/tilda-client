import React from "react"
import Image from "next/image"

import notFoundImg from "assets/images/empty.svg"
import { convertRemToPixels } from "utils"

interface Props<T> {
  containerClassName?: string
  data: Array<T>
  renderItem: (item: T, index: number) => JSX.Element
  emptyListTextMessage?: string
  ListEmptyComponent?: React.ReactNode
}

const List = <T extends unknown>({
  containerClassName = "",
  data = [],
  renderItem = () => null,
  emptyListTextMessage = "Can't find any items!",
  ListEmptyComponent = null,
}: Props<T>) => {
  const renderContent = () => {
    if (data.length === 0) {
      return (
        <div className="w-full flex flex-col items-center justify-center">
          <Image
            src={notFoundImg}
            alt="The list is empty"
            width={convertRemToPixels(20)}
            height={convertRemToPixels(20)}
          />
          <p className="text-center text-slate-900">{emptyListTextMessage}</p>
          {ListEmptyComponent}
        </div>
      )
    }

    return data.map((item, index) => renderItem(item, index))
  }
  return (
    <div className={`w-full flex flex-col ${containerClassName}`}>
      {renderContent()}
    </div>
  )
}

export default List
