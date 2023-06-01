import { AppContext } from "@/context/AppContext"
import {
  Avatar,
  Box,
  Button,
  Flex,
  List,
  ListItem,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { isNil } from "ramda"
import { useContext, useEffect, useRef, useState } from "react"

const EventMsg = () => {
  const router = useRouter()
  const { eventId } = router.query
  const { db, getMessages, getDateString, getTimeString, setNewMessage } =
    useContext(AppContext)
  const messageRef = useRef()
  const [messages, setMessages] = useState([])

  const onSetNewMessageSuccess = async () => {
    setMessages(await getMessages(eventId))
  }

  const handleSubmitClick = async () => {
    setNewMessage(messageRef.current, eventId, onSetNewMessageSuccess)
  }

  const MessagesList = () => {
    return (
      <>
        <Textarea
          maxLength={"800"}
          placeholder="Write a message"
          onChange={(e) => (messageRef.current = e.target.value)}
        />
        <Button onClick={handleSubmitClick}>Submit</Button>

        <List pt="88px">
          {Array.isArray(messages) &&
            messages.map((item, index) => (
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
                      {item.data.msg}
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
    ;(async () => {
      if (!isNil(db)) {
        setMessages(await getMessages(eventId))
      }
    })()
  }, [db])

  return (
    <>
      <Text>EventMsg Page</Text>
      <MessagesList />
    </>
  )
}
export default EventMsg
