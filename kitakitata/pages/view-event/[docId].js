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
  VStack,
} from "@chakra-ui/react"
import { isNil, not } from "ramda"
import { toast } from "react-toastify"
import GoBack from "@/components/GoBack"
import { CalendarIcon, DeleteIcon, TimeIcon } from "@chakra-ui/icons"
import { GoLocation } from "react-icons/go"

export default function ViewEvent() {
  const {
    initDB,
    getEvent,
    user,
    setUserRsvpForEvent,
    getUserRsvpForEvent,
    setIsLoginModalOpen,
    deleteEvent,
    getDateString,
    getTimeString,
  } = useContext(AppContext)
  const router = useRouter()
  const { docId } = router.query
  const [eventData, setEventData] = useState({})
  const [userRsvpData, setUserRsvpData] = useState({})
  const [isEventOwner, setIsEventOwner] = useState(false)

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
    await deleteEvent(docId)
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
      if (user && initDB && eventData) {
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
          <Box justifyContent="flex-start" my="28px">
            <GoBack />
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
                        Join
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
              <Text>{eventData?.data?.location}</Text>
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
              <Box>
                <Text fontWeight="800">Owner</Text>
                <Text>{eventData?.data?.user_address}</Text>
              </Box>
              <Box>
                <Text fontWeight="800">Organizer</Text>
                <Text>{eventData?.data?.organizer}</Text>
              </Box>
              <Box>
                <Text fontWeight="800">End Date</Text>
                <Text>{eventData?.data?.user_address}</Text>
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

          {/* <Text>ViewEvent Page</Text>
          <Text>event_id: {eventData?.data?.event_id}</Text>
          <Text>user_address: {eventData?.data?.user_address}</Text>
          <Text>date: {eventData?.data?.date}</Text>
          <Text>event title: {eventData?.data?.title}</Text>
          <Text>organizer: {eventData?.data?.organizer}</Text>
          <Text>location: {eventData?.data?.location}</Text>
          <Text>start_time: {eventData?.data?.start_time}</Text>
          <Text>end_time: {eventData?.data?.end_time}</Text>
          <Text>event_details: {eventData?.data?.event_details}</Text>
          <Text>
            Is user going to the event? {String(userRsvpData?.isGoing)}
          </Text>
          <Text>Is user owner of the event? {String(isEventOwner)}</Text>
          <Button
            disabled={true}
            onClick={() => {
              handleRsvpClick()
            }}
          >
            {userRsvpData?.isGoing ? "Leave" : "Join"}
          </Button>
          <Text>
            Only owner of the event can view attendees, edit/delete event
          </Text>
          <Box>
            {isEventOwner && (
              <Button onClick={() => handleViewAttendeesClick()}>
                View Attendees
              </Button>
            )}
          </Box>
          <Box>
            {isEventOwner && (
              <Button onClick={() => handleEditEventClick()}>Edit Event</Button>
            )}
          </Box>
          <Box>
            {isEventOwner && (
              <Button onClick={() => handleDeleteEventClick()}>
                Delete Event
              </Button>
            )}
          </Box> */}
        </Container>
      </Layout>
    </>
  )
}
