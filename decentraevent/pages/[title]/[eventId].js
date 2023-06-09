import { useContext, useEffect, useRef } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import { useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { isNil, not } from "ramda"
import {
  CalendarIcon,
  ChatIcon,
  DeleteIcon,
  EditIcon,
  TimeIcon,
} from "@chakra-ui/icons"
import { GoLocation } from "react-icons/go"
import Link from "next/link"
import { toast } from "react-toastify"
import { nanoid } from "nanoid"
import { FaTwitter } from "react-icons/fa"

export default function ViewEvent() {
  const COLLECTION_COMMENTS = "comments"
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
    db,
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
  const tabs = isNil(user)
    ? ["Details"]
    : !isNil(db)
    ? ["Details", "Comments"]
    : ["Details"]
  const [comments, setComments] = useState([])
  const commentRef = useRef()

  const getComments = async () => {
    setIsLoading(true)

    try {
      const _comments = await db.cget(
        COLLECTION_COMMENTS,
        ["event_id", "==", eventId],
        ["date", "desc"]
      )
      setComments(_comments)
      console.log("getComments()", _comments)
    } catch (e) {
      toast(e.message)
      console.error(`getComments() catch: ${e}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitClick = async () => {
    if (isNil(user)) {
      setIsLoginModalOpen(true)
      return
    }

    try {
      setIsLoading(true)
      const docId = nanoid()
      const commentObj = {
        user_address: db.signer(),
        date: db.ts(),
        event_id: eventId,
        comment: commentRef.current,
      }

      const tx = await db.upsert(commentObj, COLLECTION_COMMENTS, docId, user)
      if (tx.error) {
        throw new Error("Error! " + tx.error)
      }
      getComments()
    } catch (e) {
      toast(e.message)
      console.error(`handleSubmitClick() catch: ${e}`)
    } finally {
      setIsLoading(false)
    }
  }

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
      const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}`
      window.open(tweetUrl, "_blank")
      toast("URL copied to clipboard!")
    } catch (e) {
      console.error("Failed to copy URL: ", e)
      toast(`Failed to copy URL: ${e}`)
    }
  }

  const handleMessageClick = async () => {
    // await router.push({
    //   pathname: `/msg/${eventId}`,
    // })
    toast("Feature coming soon!")
  }

  const Tabs = () => {
    return (
      <>
        <Flex>
          {tabs.map((item, index) => (
            <Box
              key={index}
              mr="28px"
              my="55px"
              p="16px"
              fontSize="24px"
              fontWeight="500"
              onClick={() => setTab(item)}
              borderBottom={tab === item ? "1px solid #000000" : ""}
              cursor="pointer"
              _hover={{
                textDecoration: "none",
                borderColor: "black",
                borderWidth: "1px",
                boxShadow: "4px 4px 0px #000000",
              }}
            >
              {item}
            </Box>
          ))}
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

          {eventData?.data?.nft_contract && (
            <>
              <Box>
                <Text fontWeight="800">ERC-721 Contract Address</Text>
                <Text>{eventData?.data?.nft_contract}</Text>
              </Box>
            </>
          )}

          {eventData?.data?.chain_id && (
            <>
              <Box>
                <Text fontWeight="800">Chain ID</Text>
                <Text>{eventData?.data?.chain_id}</Text>
              </Box>
            </>
          )}

          {eventData?.data?.event_details && (
            <>
              <Box>
                <Text fontWeight="800">Details</Text>
                <Text>{eventData?.data?.event_details}</Text>
              </Box>
            </>
          )}
        </Stack>
      </>
    )
  }

  const Comments = () => {
    return (
      <>
        <Textarea
          maxLength={"800"}
          placeholder="Write a comment"
          onChange={(e) => (commentRef.current = e.target.value)}
        />
        <Button onClick={handleSubmitClick}>Submit</Button>

        <List pt="88px">
          {comments.map((item, index) => (
            <ListItem key={index} mb="24px">
              <Flex>
                <Avatar size="md" />
                <Flex
                  p="4px"
                  ml="18px"
                  flexDirection="column"
                  fontWeight="500"
                  fontSize="14px"
                >
                  <Box>
                    {item.data.user_address.slice(0, 8)}.....
                    {item.data.user_address.slice(-5)}
                  </Box>
                  <Box>
                    {getDateString(item.data.date)}{" "}
                    {getTimeString(item.data.date)}
                  </Box>
                  <Spacer />
                  <Text py="18px" fontWeight="400" fontSize="16px">
                    {item.data.comment}
                  </Text>
                </Flex>
              </Flex>
            </ListItem>
          ))}
        </List>
      </>
    )
  }

  useEffect(() => {
    setIsLoading(true)
  }, [])

  useEffect(() => {
    ;(async () => {
      if (initDB) {
        const _eventData = await getEventByEventId(eventId)
        console.log("ViewEvent _eventData", _eventData)
        // setEventData(_eventData.shift())
        setEventData(_eventData[0])

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
          const isRsvpGated =
            eventData?.data?.nft_contract && eventData?.data?.chain_id
              ? true
              : false
          const _userRsvp = await getUserRsvpForEvent(
            user.wallet.toLowerCase(),
            eventData?.data?.event_id,
            isRsvpGated
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
      getComments()
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
                        bg="white"
                        color="black"
                        _hover={{
                          borderColor: "white",
                          borderWidth: "1px",
                          boxShadow: "4px 4px 0px #000000",
                          bg: "black",
                          color: "white",
                        }}
                      >
                        <Center>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                          </svg>
                        </Center>
                      </MenuButton>
                      <MenuList fontSize="18px" fontWeight="400">
                        <MenuItem
                          icon={<FaTwitter />}
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
                              icon={<EditIcon />}
                              onClick={() => handleEditEventClick()}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              icon={
                                <DeleteIcon
                                  onClick={() => handleDeleteEventClick()}
                                />
                              }
                            >
                              Delete
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
            {tab === "Details" ? (
              <Details />
            ) : (
              <>{!isNil(db) && <Comments />}</>
            )}
          </Flex>
        </Container>
      </Layout>
    </>
  )
}
