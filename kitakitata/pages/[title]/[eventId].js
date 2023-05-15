import { useContext, useEffect } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import { useState } from "react"
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react"
import { isNil, not } from "ramda"
import { CalendarIcon, DeleteIcon, TimeIcon } from "@chakra-ui/icons"
import { GoLocation } from "react-icons/go"
import Link from "next/link"

export default function ViewEvent() {
  const {
    initDB,
    getEventWithEventId,
    user,
    setUserRsvpForEvent,
    getUserRsvpForEvent,
    setIsLoginModalOpen,
    deleteEvent,
    getDateString,
    getTimeString,
  } = useContext(AppContext)
  const router = useRouter()
  const { eventId } = router.query
  const [eventData, setEventData] = useState({})
  const [userRsvpData, setUserRsvpData] = useState({})
  const [isEventOwner, setIsEventOwner] = useState(false)
  const [placeUrl, setPlaceUrl] = useState(null)

  const handleRsvpClick = async () => {
    if (isNil(user)) {
      setIsLoginModalOpen(true)
    } else {
      const isGoing = not(userRsvpData?.isGoing)
      console.log("handleRsvpClick() isGoing", isGoing)
      setUserRsvpForEvent(eventData, isGoing)
      setUserRsvpData({ ...userRsvpData, isGoing: isGoing })
    }
  }

  const handleViewAttendeesClick = () => {
    window.open(`/view-attendees/${eventData?.data.event_id}`, "_blank")
  }

  const handleEditEventClick = async () => {
    await router.push({
      pathname: `/edit-event/${eventData.id}`,
    })
  }

  const handleDeleteEventClick = async () => {
    await deleteEvent(eventData.id)
  }

  useEffect(() => {
    ;(async () => {
      if (initDB) {
        const _eventData = await getEventWithEventId(eventId)
        console.log("ViewEvent _eventData", _eventData)
        setEventData(_eventData.shift())
      }
    })()
  }, [initDB])

  useEffect(() => {
    ;(async () => {
      if (user && initDB && eventData) {
        const _placeId = eventData?.data?.location?.place_id
        console.log("useEffect eventData", eventData)
        console.log(`_placeId: ${_placeId}`)
        const _placeUrl = _placeId
          ? `https://www.google.com/maps/place/?q=place_id:${_placeId}`
          : null
        setPlaceUrl(_placeUrl)
        console.log(`placeUrl: ${_placeUrl}`)

        const _userRsvp = await getUserRsvpForEvent(
          user.wallet.toLowerCase(),
          eventData?.data?.event_id
        )
        console.log("ViewEvent _userRsvp", _userRsvp)
        setUserRsvpData(_userRsvp)
      }
    })()
  }, [eventData])

  useEffect(() => {
    ;(async () => {
      setIsEventOwner(!!user && user.wallet.toLowerCase() === eventData?.setter)
    })()
  }, [user, eventData])

  return (
    <>
      <Layout>
        <Container maxW={"8xl"}>
          <Box justifyContent="flex-start" mt="58px" mb="38px">
            {/* <GoBack /> */}
          </Box>

          <Box
            h="291px"
            bgGradient="linear-gradient(90deg, #A163B9 0%, #874DA1 14.06%, #593980 27.2%, #413A78 40.39%, #3D5584 52.48%, #426F93 64.13%, #518BA4 74.25%, #5EA6B5 83.04%, #5FAFBB 90.95%, #67B5BC 97.99%)"
            position="relative"
            mt="14px"
            mb="38px"
          />

          <Stack spacing="24px">
            <Stack direction={{ base: "column", md: "row" }}>
              <Heading fontSize="28px" fontWeight="500">
                {eventData?.data?.title}
              </Heading>
              <Spacer />
              <HStack alignItems="flex-start">
                {isEventOwner ? (
                  <>
                    <IconButton
                      icon={<DeleteIcon />}
                      bg="white"
                      color="black"
                      _hover={{
                        borderColor: "white",
                        borderWidth: "1px",
                        boxShadow: "4px 4px 0px #000000",
                        bg: "black",
                        color: "white",
                      }}
                      onClick={() => handleDeleteEventClick()}
                    ></IconButton>
                    <Button
                      border="1px solid #000000"
                      bg="white"
                      color="black"
                      py="14px"
                      px="16px"
                      _hover={{
                        borderColor: "white",
                        borderWidth: "1px",
                        boxShadow: "4px 4px 0px #000000",
                        bg: "black",
                        color: "white",
                      }}
                      onClick={() => handleEditEventClick()}
                    >
                      Edit
                    </Button>
                    <Button
                      py="14px"
                      px="16px"
                      onClick={() => handleViewAttendeesClick()}
                    >
                      View Attendees
                    </Button>
                  </>
                ) : (
                  <>
                    {user ? (
                      <Button
                        py="14px"
                        px="58px"
                        onClick={() => handleRsvpClick()}
                      >
                        {userRsvpData?.isGoing ? "Leave" : "Join"}
                      </Button>
                    ) : null}
                  </>
                )}
              </HStack>
            </Stack>
            <HStack>
              <CalendarIcon />
              <Text>{getDateString(eventData?.data?.start_time)}</Text>
              <TimeIcon />
              <Text>{getTimeString(eventData?.data?.start_time)}</Text>
            </HStack>
            <HStack>
              <GoLocation />
              {placeUrl ? (
                <Link href={placeUrl} target="_blank">
                  <Text
                    _hover={{
                      px: "8px",
                      borderColor: "black",
                      borderWidth: "1px",
                      boxShadow: "4px 4px 0px black",
                      bg: "white",
                    }}
                    textDecoration="underline"
                  >
                    {eventData?.data?.location?.name}
                  </Text>
                </Link>
              ) : (
                <Text>{eventData?.data?.location?.name}</Text>
              )}
            </HStack>
          </Stack>

          <Flex mt="55px" direction="column">
            <Box display="inline-block" mb="55px">
              <Box
                display="inline-block"
                p="16px"
                fontSize="24px"
                fontWeight="500"
                borderBottom="1px solid #000000"
              >
                <Text>About Event</Text>
              </Box>
            </Box>

            <Stack spacing="14px">
              {/* <Box>
                <Text fontWeight="800">Owner</Text>
                <Text>{eventData?.data?.user_address}</Text>
              </Box> */}
              <Box>
                <Text fontWeight="800">Organizer</Text>
                <Text>{eventData?.data?.organizer}</Text>
              </Box>
              <Box>
                <Text fontWeight="800">End Date</Text>
                <Text>{getDateString(eventData?.data?.end_time)}</Text>
              </Box>
              <Box>
                <Text fontWeight="800">End Time</Text>
                <Text>{getTimeString(eventData?.data?.end_time)}</Text>
              </Box>
              <Box>
                <Text fontWeight="800">Details</Text>
                <Text>{eventData?.data?.event_details}</Text>
              </Box>
            </Stack>
          </Flex>
        </Container>
      </Layout>
    </>
  )
}
