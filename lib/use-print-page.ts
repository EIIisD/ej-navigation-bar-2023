import { useEffect } from "react"

const usePrintPage = () => {
  useEffect(() => {
    const printPage = () => {
      if (typeof window !== "undefined") {
        window.print()
      }
    }

    printPage()
  }, [])
}

export default usePrintPage
