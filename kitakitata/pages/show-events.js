import BannerTwo from "@/components/BannerTwo"
import Events from "@/components/Events"
import Layout from "@/components/Layout"
import { AppContext } from "@/context/AppContext"
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react"
import { isNil } from "ramda"
import { useContext, useEffect, useState } from "react"

export default function ShowEvents() {
  const { user, updateEventsList, initDB } = useContext(AppContext)
  const [tab, setTab] = useState("All")
  const tabs = isNil(user) ? ["All"] : ["All", "My Events"]

  const Tabs = () => {
    return (
      <>
        <Container maxW="5xl" mt="28px">
          <Flex justify="space-between" alignItems="center">
            <Flex>
              {tabs.map((v) => (
                <Box
                  key={v}
                  p="16px"
                  mr="18px"
                  fontSize="md"
                  fontWeight={500}
                  color={tab === v ? "black" : "gray.500"}
                  cursor="pointer"
                  _hover={{
                    textDecoration: "none",
                    borderColor: "black",
                    borderWidth: "1px",
                    boxShadow: "4px 4px 0px #000000",
                  }}
                  onClick={() => setTab(v)}
                  borderBottom={tab === v ? "1px solid black" : ""}
                >
                  {v}
                </Box>
              ))}
            </Flex>
            <Button>Create Event</Button>
          </Flex>
        </Container>
      </>
    )
  }

  useEffect(() => {
    if (initDB) {
      if (tab === "All") {
        updateEventsList(true)
      } else {
        updateEventsList(false)
      }
    }
  }, [tab, initDB])

  return (
    <>
      <Layout>
        <BannerTwo />
        <Tabs />
        <Events />
      </Layout>
    </>
  )
}
