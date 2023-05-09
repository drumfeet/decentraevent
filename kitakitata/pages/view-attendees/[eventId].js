import Layout from "@/components/Layout"
import {
  Flex,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Container,
  Box,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import { isNil } from "ramda"
import { toast } from "react-toastify"
import { CalendarIcon, DownloadIcon, TimeIcon } from "@chakra-ui/icons"
import GoBack from "@/components/GoBack"
import { GoLocation } from "react-icons/go"
import queryString from "query-string"

export default function ViewAttendees() {
  const router = useRouter()
  const { eventId, data } = router.query
  const { initDB, getEventAttendees, getEventWithEventId } =
    useContext(AppContext)
  const [eventAttendees, setEventAttendees] = useState([])
  const [eventData, setEventData] = useState({})

  const handleDownload = () => {
    const csvData = eventAttendees
      .map(
        (attendee) =>
          `${attendee?.decrypted.name},${attendee?.decrypted.email},${attendee?.decrypted.user_address},${attendee?.decrypted.isGoing}`
      )
      .join("\n")

    const blob = new Blob([csvData], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "attendees.csv")
    link.click()
    URL.revokeObjectURL(url)

    console.log("<<handleDownload")
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (initDB) {
          const _eventData = await getEventWithEventId(eventId)
          console.log("view-attendees eventId", eventId)
          setEventData(_eventData.shift())
          console.log("view-attendees _eventData", _eventData)

          const _eventAttendees = await getEventAttendees(eventId)
          console.log("view-attendees _eventAttendees", _eventAttendees)
          setEventAttendees(_eventAttendees)
        }
      } catch (e) {
        toast(e.message)
        console.error("useEffect view-attendees catch()", e)
      }
    })()
  }, [initDB])

  return (
    <Layout>
      <Container maxW={"8xl"}>
        <Box justifyContent="flex-end" my="28px">
          <Button
            onClick={handleDownload}
            rightIcon={<DownloadIcon />}
            alignSelf="flex-end"
          >
            Download Attendees
          </Button>
        </Box>

        <Box
          h="291px"
          bgGradient="linear-gradient(90deg, #A163B9 0%, #874DA1 14.06%, #593980 27.2%, #413A78 40.39%, #3D5584 52.48%, #426F93 64.13%, #518BA4 74.25%, #5EA6B5 83.04%, #5FAFBB 90.95%, #67B5BC 97.99%)"
          position="relative"
        >
          <Button
            position="absolute"
            bottom="16px"
            right="16px"
            bg="rgba(255, 255, 255, 0.5)"
            color="black.text"
            fontWeight="400"
            fontSize="16px"
            _hover={{
              borderColor: "white",
              borderWidth: "1px",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            Change Cover
          </Button>
        </Box>

        <Stack spacing="8px">
          <HStack>
            <Heading>Event Name</Heading>
            <HStack flex="1" ml="auto" justifyContent="flex-end">
              <CalendarIcon />
              <Text>{eventData?.data?.start_time}</Text>
              <TimeIcon />
              <Text>Time</Text>
            </HStack>
          </HStack>
          <HStack justifyContent="flex-end">
            <GoLocation />
            <Text>Location</Text>
          </HStack>
        </Stack>
      </Container>

      {/* <TableContainer hidden={false}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Address</Th>
              <Th>Is Going</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(eventAttendees) &&
              eventAttendees.map((attendee) => (
                <Tr key={attendee?.decrypted.user_address}>
                  <Td>{attendee?.decrypted.name}</Td>
                  <Td>{attendee?.decrypted.email}</Td>
                  <Td>{attendee?.decrypted.user_address}</Td>
                  <Td>{String(attendee?.decrypted.isGoing)}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer> */}
    </Layout>
  )
}
