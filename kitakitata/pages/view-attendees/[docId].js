import Layout from "@/components/Layout"
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Textarea,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import { isNil } from "ramda"
import { toast } from "react-toastify"
import { DownloadIcon } from "@chakra-ui/icons"

export default function ViewAttendees() {
  const {
    updateEvent,
    eventData,
    setEventData,
    eventAttendees,
    setEventAttendees,
    initDB,
  } = useContext(AppContext)
  const router = useRouter()
  const { docId, metadata } = router.query
  const jsonMetadata = metadata ? JSON.parse(metadata) : null

  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const handleInputChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.id]: event.target.value,
    })
  }

  const handleDownload = (event) => {
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

  const convertDateTime = () => {
    const MILLISECONDS = 1000

    const startTimeUnix = new Date(jsonMetadata.data.start_time * MILLISECONDS)
    const offsetMinutesStartTime = startTimeUnix.getTimezoneOffset()
    startTimeUnix.setMinutes(
      startTimeUnix.getMinutes() - offsetMinutesStartTime
    )
    const startTimeIsoString = startTimeUnix.toISOString().slice(0, 16)
    setStartTime(startTimeIsoString)

    const endTimeUnix = new Date(jsonMetadata.data.end_time * MILLISECONDS)
    const offsetMinutesEndTime = endTimeUnix.getTimezoneOffset()
    endTimeUnix.setMinutes(endTimeUnix.getMinutes() - offsetMinutesEndTime)
    const endTimeIsoString = endTimeUnix.toISOString().slice(0, 16)
    setEndTime(endTimeIsoString)
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (initDB && !isNil(jsonMetadata)) {
          setEventData(jsonMetadata.data)
          convertDateTime()
        }
      } catch (e) {
        toast(e.message)
        console.error("useEffect view-attendees catch()", e)
      }
    })()
  }, [docId, metadata])

  return (
    <Layout>
      <Flex justifyContent="flex-end">
        <Button
          size="lg"
          variant="ghost"
          onClick={handleDownload}
          rightIcon={<DownloadIcon />}
          alignSelf="flex-end"
        >
          Download Attendees
        </Button>
      </Flex>
      <TableContainer hidden={false}>
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
      </TableContainer>
    </Layout>
  )
}
