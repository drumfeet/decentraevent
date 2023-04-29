import { useContext, useEffect } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import { useState } from "react"
import { Text } from "@chakra-ui/react"

export default function ViewEvent() {
  const { initDB, getEvent } = useContext(AppContext)
  const router = useRouter()
  const { docId } = router.query
  console.log("ViewEvent docId", docId)
  const [eventData, setEventData] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (initDB) {
        const _eventData = await getEvent(docId)
        setEventData(_eventData)
        console.log("ViewEvent _eventData", _eventData)
      }
    })()
  }, [initDB])

  return (
    <>
      <Layout>
        ViewEvent Page
        <Text>eventData.data.event_id: {eventData?.data?.event_id}</Text>
      </Layout>
    </>
  )
}
