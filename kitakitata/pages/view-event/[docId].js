import { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"

export default function ViewEvent() {
  const {} = useContext(AppContext)
  const router = useRouter()
  const { docId, metadata } = router.query
  const jsonMetadata = metadata ? JSON.parse(metadata) : null

  return (
    <>
      <Layout>ViewEvent Page</Layout>
    </>
  )
}
