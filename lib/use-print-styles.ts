import { useEffect } from "react"

const usePrintStyles = (): void => {
  useEffect(() => {
    const enablePrintStyles = () => {
      if (typeof document !== "undefined") {
        document.documentElement.classList.add("print")
      }
    }

    const disablePrintStyles = () => {
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("print")
      }
    }

    enablePrintStyles()

    return () => disablePrintStyles()
  }, [])
}

export default usePrintStyles
