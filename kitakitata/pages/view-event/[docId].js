import { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"

export default function ViewEvent() {
  const {} = useContext(AppContext)
  const router = useRouter()
  const { docId, metadata } = router.query
  const jsonMetadata = metadata ? JSON.parse(metadata) : null

  return (
  <>ViewEvent Page</>
  )
}
