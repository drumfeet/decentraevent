import { AppContext } from "@/context/AppContext"
import { CalendarIcon, ExternalLinkIcon, TimeIcon } from "@chakra-ui/icons"
import {
  Card,
  Flex,
  CardHeader,
  CardBody,
  Text,
  Button,
  Image,
  Heading,
  Container,
} from "@chakra-ui/react"
import { take } from "ramda"
import { useContext, useState } from "react"

const MILLISECONDS = 1000
const NUM_OF_CARDS = 8
const IMG_DEFAULT =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlYXV0aWZ1bCUyMGNvbGxlY3Rpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
const IMG_FALLBACK = "https://via.placeholder.com/269x118.png?text=No+Image"

const getDateString = (timestamp) => {
  const date = new Date(timestamp * MILLISECONDS)
  const dateString = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return `${dateString}`
}

const getTimeString = (timestamp) => {
  const date = new Date(timestamp * MILLISECONDS)
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  })

  return `${timeString}`
}

export default function CardSmall() {
  const { events } = useContext(AppContext)
  const [numCardsToShow, setNumCardsToShow] = useState(NUM_OF_CARDS)

  const handleSeeMore = async () => {
    setNumCardsToShow(numCardsToShow + NUM_OF_CARDS)
  }

  return (
    <>
      <Flex justifyContent="flex-start" alignItems="center" flexWrap="wrap">
        {take(numCardsToShow, events).map((v) => {
          return (
            <Card key={v.id} m={8}>
              <Image
                src={IMG_DEFAULT}
                fallbackSrc={IMG_FALLBACK}
                maxW="269px"
                maxH="118px"
              />
              <CardBody>
                <Text fontSize="15px" noOfLines={1}>
                  {v?.data?.title}
                </Text>
                <CalendarIcon />
                <Text>{getDateString(v?.data?.start_time)}</Text>
                <TimeIcon />
                <Text>{getTimeString(v?.data?.start_time)}</Text>
                <ExternalLinkIcon />
              </CardBody>
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
