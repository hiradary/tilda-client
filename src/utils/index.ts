const copyToClipboard = (str: string) => {
  return new Promise<void>((resolve, reject) => {
    const fallback = () => {
      try {
        const el = document.createElement("textarea")
        el.value = str
        el.setAttribute("readonly", "")
        el.style.position = "absolute"
        el.style.left = "-9999px"
        document.body.appendChild(el)
        const selected =
          document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt(0)
            : false
        el.select()
        document.execCommand("copy")
        document.body.removeChild(el)
        if (selected) {
          document.getSelection().removeAllRanges()
          document.getSelection().addRange(selected)
        }
        resolve()
      } catch (err) {
        reject(err)
      }
    }

    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(str).then(resolve).catch(fallback)
    } else {
      fallback()
    }
  })
}

const convertRemToPixels = (remValue: number) => {
  try {
    return (
      remValue * parseFloat(getComputedStyle(document.documentElement).fontSize)
    )
  } catch (err) {
    return remValue * 16
  }
}

const withHttp = (url) => (!/^https?:\/\//i.test(url) ? `https://${url}` : url)

export { copyToClipboard, convertRemToPixels, withHttp }
