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
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react"
import { isNil, map, not } from "ramda"
import {
  CalendarIcon,
  ChatIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  TimeIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons"
import { GoLocation } from "react-icons/go"
import Link from "next/link"
import { toast } from "react-toastify"

export default function ViewEvent() {
  const {
    initDB,
    getEventByEventId,
    user,
    setUserRsvpForEvent,
    getUserRsvpForEvent,
    setIsLoginModalOpen,
    deleteEvent,
    getDateString,
    getTimeString,
    isLoading,
    setIsLoading,
    getRsvpCount,
  } = useContext(AppContext)
  const router = useRouter()
  const { eventId } = router.query
  const [eventData, setEventData] = useState({})
  const [userRsvpData, setUserRsvpData] = useState({})
  const [isEventOwner, setIsEventOwner] = useState(false)
  const [placeUrl, setPlaceUrl] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [urlImage, setUrlImage] = useState("")
  const [rsvpCount, setRsvpCount] = useState("")
  const [tab, setTab] = useState("Details")
  const tabs = isNil(user) ? ["Details"] : ["Details", "Comments"]

  const handleImageError = () => {
    setImageLoaded(false)
  }

  const handleRsvpClick = async () => {
    if (isNil(user)) {
      setIsLoginModalOpen(true)
      return
    }
    const isGoing = not(userRsvpData?.isGoing)
    console.log("handleRsvpClick() isGoing", isGoing)
    setUserRsvpForEvent(eventData, isGoing)
    setUserRsvpData({ ...userRsvpData, isGoing: isGoing })
    setRsvpCount(isGoing ? rsvpCount + 1 : rsvpCount - 1)
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

  const handleShareClick = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not supported")
      }

      const url = window.location.href
      navigator.clipboard.writeText(url)

      toast("URL copied to clipboard!")
    } catch (e) {
      console.error("Failed to copy URL: ", e)
      toast(`Failed to copy URL: ${e}`)
    }
  }

  const handleMessageClick = () => {
    toast("Feature coming soon!")
  }

  const Tabs = () => {
    return (
      <>
        <Flex>
          {map((v) => (
            <Box
              mr="28px"
              my="55px"
              p="16px"
              fontSize="24px"
              fontWeight="500"
              onClick={() => setTab(v)}
              borderBottom={tab === v ? "1px solid #000000" : ""}
              cursor="pointer"
              _hover={{
                textDecoration: "none",
                borderColor: "black",
                borderWidth: "1px",
                boxShadow: "4px 4px 0px #000000",
              }}
            >
              {v}
            </Box>
          ))(tabs)}
        </Flex>
      </>
    )
  }

  const Details = () => {
    return (
      <>
        <Stack spacing="14px">
          <Box>
            <Text fontWeight="800">RSVP Count</Text>
            <Text>{rsvpCount}</Text>
          </Box>
          <Box>
            <Text fontWeight="800">RSVP Limit</Text>
            <Text>{eventData?.data?.rsvp_limit || "-"}</Text>
          </Box>
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
      </>
    )
  }

  const Comments = () => {
    return <>Comments Section</>
  }

  useEffect(() => {
    setIsLoading(true)
  }, [])

  useEffect(() => {
    ;(async () => {
      if (initDB) {
        const _eventData = await getEventByEventId(eventId)
        console.log("ViewEvent _eventData", _eventData)
        setEventData(_eventData.shift())

        const _rsvpCount = await getRsvpCount(eventId)
        console.log("ViewEvent _rsvpCount", _rsvpCount)
        setRsvpCount(_rsvpCount)
      }
    })()
  }, [initDB])

  useEffect(() => {
    ;(async () => {
      if (initDB && eventData) {
        setUrlImage(`https://arweave.net/${eventData?.data?.image_id}`)
        setImageLoaded(true)
        const _placeId = eventData?.data?.location?.place_id
        console.log("useEffect eventData", eventData)
        console.log(`_placeId: ${_placeId}`)
        const _placeUrl = _placeId
          ? `https://www.google.com/maps/place/?q=place_id:${_placeId}`
          : null
        setPlaceUrl(_placeUrl)
        console.log(`placeUrl: ${_placeUrl}`)

        if (user) {
          const _userRsvp = await getUserRsvpForEvent(
            user.wallet.toLowerCase(),
            eventData?.data?.event_id
          )
          console.log("ViewEvent _userRsvp", _userRsvp)
          setUserRsvpData(_userRsvp)
        }
      }
    })()
  }, [eventData])

  useEffect(() => {
    ;(async () => {
      setIsEventOwner(!!user && user.wallet.toLowerCase() === eventData?.setter)
    })()
  }, [user, eventData])

  useEffect(() => {
    if (tab === "Comments") {
      toast("Feature coming soon!")
    }
  }, [tab])

  return (
    <>
      <Layout>
        <Container maxW={"8xl"}>
          <Box justifyContent="flex-start" mt="58px" mb="38px">
            {/* <GoBack /> */}
          </Box>
          {imageLoaded ? (
            <Image
              src={urlImage}
              alt="Image"
              h="291px"
              objectFit="contain"
              onError={handleImageError}
              position="relative"
              mt="14px"
              mb="38px"
            />
          ) : (
            <Box
              h="291px"
              bgGradient="linear-gradient(90deg, #A163B9 0%, #874DA1 14.06%, #593980 27.2%, #413A78 40.39%, #3D5584 52.48%, #426F93 64.13%, #518BA4 74.25%, #5EA6B5 83.04%, #5FAFBB 90.95%, #67B5BC 97.99%)"
              position="relative"
              mt="14px"
              mb="38px"
            >
              <Text
                position="absolute"
                bottom="16px"
                right="16px"
                color="white"
                fontWeight="400"
                fontSize="14px"
              >
                Image is not available
              </Text>
            </Box>
          )}

          <Stack spacing="24px">
            <Stack direction={{ base: "column", md: "row" }}>
              <Heading fontSize="28px" fontWeight="500">
                {eventData?.data?.title}
              </Heading>
              <Spacer />
              <HStack alignItems="flex-start">
                {user ? (
                  <>
                    {isEventOwner && (
                      <>
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
                          onClick={() => handleViewAttendeesClick()}
                        >
                          View Attendees
                        </Button>
                      </>
                    )}
                    <Button
                      py="14px"
                      px="58px"
                      onClick={() => handleRsvpClick()}
                      isLoading={isLoading}
                      isDisabled={
                        rsvpCount >= eventData?.data?.rsvp_limit &&
                        !userRsvpData?.isGoing
                      }
                    >
                      {userRsvpData?.isGoing ? "Leave" : "Join"}
                    </Button>
                    <Menu>
                      <MenuButton
                        _loading={{ pointerEvents: "none" }}
                        isLoading={isLoading}
                        as={IconButton}
                      >
                        <TriangleDownIcon />
                      </MenuButton>
                      <MenuList fontSize="18px" fontWeight="400">
                        <MenuItem
                          icon={<ExternalLinkIcon />}
                          onClick={async () => {
                            handleShareClick()
                          }}
                        >
                          Share
                        </MenuItem>
                        <MenuItem
                          icon={<ChatIcon />}
                          onClick={async () => {
                            handleMessageClick()
                          }}
                        >
                          Message
                        </MenuItem>

                        {isEventOwner && (
                          <>
                            <MenuItem
                              icon={
                                <DeleteIcon
                                  onClick={() => handleDeleteEventClick()}
                                />
                              }
                            >
                              Delete
                            </MenuItem>
                            <MenuItem
                              icon={<EditIcon />}
                              onClick={() => handleEditEventClick()}
                            >
                              Edit
                            </MenuItem>
                          </>
                        )}
                      </MenuList>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button py="14px" px="58px" onClick={handleShareClick}>
                      Share
                    </Button>
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
            <Tabs />
            <Details />
          </Flex>
        </Container>
      </Layout>
    </>
  )
}
