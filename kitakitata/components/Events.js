import { AppContext } from "@/context/AppContext"
import {
  CheckIcon,
  HamburgerIcon,
  EditIcon,
  StarIcon,
  DeleteIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons"
import {
  Box,
  Card,
  Flex,
  CardHeader,
  Avatar,
  Heading,
  CardBody,
  Text,
  Divider,
  Button,
  IconButton,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Image,
  CardFooter,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { take, filter, find, pathEq } from "ramda"
import { useContext, useState } from "react"
import { toast } from "react-toastify"

const MILLISECONDS = 1000
const NUM_OF_CARDS = 8

const formatDateTime = (timestamp) => {
  const date = new Date(timestamp * MILLISECONDS)
  const dateString = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
  return `${dateString} ${timeString}`
}

function EventDetails({ isOpen, onClose, eventData, onGoing, isUserGoing }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Stack spacing={4}>
          <ModalHeader>
            <Image src="#" fallbackSrc="https://via.placeholder.com/150" />
          </ModalHeader>
        </Stack>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Text>Organizer: {eventData?.data?.organizer}</Text>
            <Text>Creator: {eventData?.data?.user_address}</Text>
            <Divider />
            <Text>Title: {eventData?.data?.title}</Text>
            <Text>Location: {eventData?.data?.location}</Text>
            <Text>
              Start Time: {formatDateTime(eventData?.data?.start_time)}
            </Text>
            <Text>End Time: {formatDateTime(eventData?.data?.end_time)}</Text>
            <Text>Details: {eventData?.data?.event_details}</Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            hidden={true}
            variant="ghost"
            bg={isUserGoing ? "green.500" : null}
            color={isUserGoing ? "white" : null}
            leftIcon={<CheckIcon />}
            onClick={() => onGoing(eventData, isUserGoing)}
          >
            Going
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function Events() {
  const {
    user,
    events,
    userRsvp,
    setRsvpStatus,
    saveToList,
    deleteEvent,
    isLoading,
    getEventAttendees,
  } = useContext(AppContext)
  const router = useRouter()
  const [numCardsToShow, setNumCardsToShow] = useState(NUM_OF_CARDS)
  const hoverBackgroundColor = useColorModeValue("gray.100", "teal.800")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [eventData, setEventData] = useState(null)
  const [isUserGoing, setIsUserGoing] = useState(false)

  const handleModalOpen = (metadata, isUserGoing) => {
    console.log("handleModalOpen", metadata)
    setEventData(metadata)
    setIsUserGoing(isUserGoing)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setEventData(null)
    setIsModalOpen(false)
  }

  const handleSeeMore = async () => {
    setNumCardsToShow(numCardsToShow + NUM_OF_CARDS)
  }

  const handleGoing = async (metadata, isUserGoing) => {
    setRsvpStatus(metadata, isUserGoing)
  }

  const handleLike = async (metadata, isUserLiked) => {
    saveToList(metadata, isUserLiked)
  }

  const handleView = async (metadata) => {
    await getEventAttendees(metadata)

    await router.push({
      pathname: `/view-attendees/${metadata.id}`,
      query: { metadata: JSON.stringify(metadata) },
    })
  }

  const handleEdit = async (metadata) => {
    await router.push({
      pathname: `/edit-event/${metadata.id}`,
      query: { metadata: JSON.stringify(metadata) },
    })

    console.log("handleEdit", metadata)
  }

  const handleDelete = async (metadata) => {
    const docId = metadata?.id
    console.log("handleDelete docId", docId)
    deleteEvent(docId)
  }

  return (
    <>
      <EventDetails
        isOpen={isModalOpen}
        onClose={handleModalClose}
        eventData={eventData}
        onGoing={handleGoing}
        isUserGoing={isUserGoing}
      />

      <Flex justifyContent="flex-start" alignItems="center" flexWrap="wrap">
        {take(numCardsToShow, events).map((v) => {
          const userWalletAddress = user?.wallet.toLowerCase()
          const isOwner = userWalletAddress === v?.setter

          let userRsvpForEvent
          if (Array.isArray(userRsvp)) {
            const _userEvent = filter(
              pathEq(["data", "event_id"], v.data.event_id),
              userRsvp
            )
            userRsvpForEvent = find(
              pathEq(["data", "user_address"], userWalletAddress),
              _userEvent
            )
            // console.log("userRsvpForEvent", userRsvpForEvent)
          }

          const isUserGoing = userRsvpForEvent?.data.is_going
          const isUserLiked = userRsvpForEvent?.data.is_liked

          return (
            <Card key={v.id} overflow="hidden" isTruncated boxSize="xs" m={8}>
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar name={v?.data?.organizer} />
                    <Box>
                      <Heading size="sm">{v?.data?.organizer}</Heading>
                      <Text>
                        Creator: {v?.data?.user_address.slice(0, 8)}.....
                      </Text>
                    </Box>
                    {isOwner && (
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          variant="ghost"
                          colorScheme="gray"
                          aria-label="See menu"
                          icon={<HamburgerIcon />}
                        />
                        <MenuList>
                          <MenuItem onClick={() => handleView(v)}>
                            View{" "}
                            <Icon as={ExternalLinkIcon} marginLeft="auto" />
                          </MenuItem>
                          <MenuItem onClick={() => handleEdit(v)}>
                            Edit <Icon as={EditIcon} marginLeft="auto" />
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(v)}>
                            Delete <Icon as={DeleteIcon} marginLeft="auto" />
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    )}
                  </Flex>
                </Flex>
              </CardHeader>
              <Divider />
              <CardBody
                cursor="pointer"
                onClick={() => handleModalOpen(v, isUserGoing)}
                _hover={{
                  backgroundColor: hoverBackgroundColor,
                }}
              >
                <Text mb={2}>Title: {v?.data?.title}</Text>
                <Text mb={2}>Location: {v?.data?.location}</Text>
                <Text mb={2}>
                  Start Time: {formatDateTime(v?.data?.start_time)}
                </Text>
                <Text mb={2}>
                  End Time: {formatDateTime(v?.data?.end_time)}
                </Text>
              </CardBody>

              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "136px",
                  },
                }}
              >
                <Button
                  bg={isUserGoing ? "green.500" : null}
                  color={isUserGoing ? "white" : null}
                  variant="ghost"
                  leftIcon={<CheckIcon />}
                  isLoading={isLoading}
                  onClick={() => handleGoing(v, isUserGoing)}
                >
                  Going
                </Button>
                <Button
                  bg={isUserLiked ? "green.500" : null}
                  color={isUserLiked ? "white" : null}
                  variant="ghost"
                  leftIcon={<StarIcon />}
                  isLoading={isLoading}
                  onClick={() => handleLike(v, isUserLiked)}
                >
                  Like
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </Flex>

      <Flex justifyContent="center" alignItems="center">
        {events.length > numCardsToShow && (
          <Button variant="outline" mb={28} onClick={handleSeeMore}>
            See More
          </Button>
        )}
      </Flex>
    </>
  )
}
