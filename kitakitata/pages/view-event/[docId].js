import { useContext, useEffect } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import { useState } from "react"
import { Button, Container, Text } from "@chakra-ui/react"
import { not } from "ramda"

export default function ViewEvent() {
  const { initDB, getEvent, user, setRsvpStatus, getUserRsvpForEvent } =
    useContext(AppContext)
  const router = useRouter()
  const { docId } = router.query
  const [eventData, setEventData] = useState(null)
  const [isUserGoing, setIsUserGoing] = useState(false)

  const handleRsvpClick = async () => {
    const isGoing = not(isUserGoing)
    console.log("handleRsvpClick isGoing", isGoing)
    setRsvpStatus(eventData, isGoing)
    setIsUserGoing(isGoing)
  }

  useEffect(() => {
    ;(async () => {
      if (initDB) {
        const _eventData = await getEvent(docId)
        setEventData(_eventData)
        console.log("ViewEvent _eventData", _eventData)
      }
    })()
  }, [initDB])

  useEffect(() => {
    ;(async () => {
      if (user && initDB) {
        const _userRsvp = await getUserRsvpForEvent(
          user.wallet.toLowerCase(),
          eventData?.data?.event_id
        )
        console.log("ViewEvent _userRsvp", _userRsvp)
        setIsUserGoing(_userRsvp.isGoing)
      }
    })()
  }, [eventData])

  return (
    <>
      <Layout>
        <Container maxW={"6xl"} my={28}>
          <Text>ViewEvent Page</Text>
          <Text>eventData.data.event_id: {eventData?.data?.event_id}</Text>
          <Text>
            eventData.data.user_address: {eventData?.data?.user_address}
          </Text>
          <Text>eventData.data.date: {eventData?.data?.date}</Text>
          <Text>eventData.data.title: {eventData?.data?.title}</Text>
          <Text>eventData.data.organizer: {eventData?.data?.organizer}</Text>
          <Text>eventData.data.location: {eventData?.data?.location}</Text>
          <Text>eventData.data.start_time: {eventData?.data?.start_time}</Text>
          <Text>eventData.data.end_time: {eventData?.data?.end_time}</Text>
          <Text>
            eventData.data.event_details: {eventData?.data?.event_details}
          </Text>
          <Text>Is User Going? {String(isUserGoing)}</Text>
          <Button
            onClick={() => {
              handleRsvpClick()
            }}
          >
            Going
          </Button>
        </Container>
      </Layout>
    </>
  )
}
