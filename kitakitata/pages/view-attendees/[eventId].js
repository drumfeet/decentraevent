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
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import { isNil } from "ramda"
import { toast } from "react-toastify"
import { DownloadIcon } from "@chakra-ui/icons"

export default function ViewAttendees() {
  const router = useRouter()
  const { eventId } = router.query
  const { initDB, getEventAttendees } = useContext(AppContext)
  const [eventAttendees, setEventAttendees] = useState([])

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
