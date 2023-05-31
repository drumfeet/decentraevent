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
import { nanoid } from "nanoid"
import { useRouter } from "next/router"
import { isNil } from "ramda"
import { useContext, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"

const EventMsg = () => {
  const router = useRouter()
  const { eventId } = router.query
  const COLLECTION_MESSAGES = "messages"
  const {
    setIsLoading,
    db,
    user,
    setIsLoginModalOpen,
    getDateString,
    getTimeString,
  } = useContext(AppContext)
  const messageRef = useRef()
  const [messages, setMessages] = useState([])

  const getMessages = async () => {
    setIsLoading(true)

    try {
      const _messages = await db.cget(
        COLLECTION_MESSAGES,
        ["event_id", "==", eventId],
        ["date", "desc"]
      )
      setMessages(_messages)
      console.log("getMessages()", _messages)
    } catch (e) {
      toast(e.message)
      console.error(`getMessages() catch: ${e}`)
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
      const messageObj = {
        user_address: db.signer(),
        date: db.ts(),
        event_id: eventId,
        msg: messageRef.current,
      }

      const tx = await db.upsert(messageObj, COLLECTION_MESSAGES, docId, user)
      if (tx.error) {
        throw new Error("Error! " + tx.error)
      }
      getMessages()
    } catch (e) {
      toast(e.message)
      console.error(`handleSubmitClick() catch: ${e}`)
    } finally {
      setIsLoading(false)
    }
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
          {messages.map((item, index) => (
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
    if (!isNil(db)) {
      getMessages()
    }
  }, [db])

  return (
    <>
      <Text>EventMsg Page</Text>
      <MessagesList />
    </>
  )
}
export default EventMsg
