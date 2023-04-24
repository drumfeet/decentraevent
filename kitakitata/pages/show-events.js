import Events from "@/components/Events"
import Layout from "@/components/Layout"
import { AppContext } from "@/context/AppContext"
import { Box, Flex } from "@chakra-ui/react"
import { isNil, map } from "ramda"
import { useContext, useEffect, useState } from "react"

export default function ShowEvents() {
  const { user, events, getEvents, getMyEvents, initDB } =
    useContext(AppContext)
  const [tab, setTab] = useState("All")
  const tabs = isNil(user) ? ["All"] : ["All", "Mine"]

  const Tabs = () => {
    return (
      <Flex justify="center" align="center" mb={4}>
        {map(
          (v) => (
            <Box
              key={v}
              p={4}
              fontSize="md"
              fontWeight={500}
              color={tab === v ? "teal.600" : "gray.500"}
              cursor="pointer"
              _hover={{ color: "teal.600" }}
              onClick={() => setTab(v)}
              borderBottom={tab === v ? "2px solid teal" : ""}
            >
              {v}
            </Box>
          ),
          tabs
        )}
      </Flex>
    )
  }

  useEffect(() => {
    if (initDB) {
      if (tab === "All") {
        getEvents()
      } else {
        getMyEvents()
      }
    }
  }, [tab, initDB])

  return (
    <>
      <Layout>
        <Tabs />
        {isNil(events) ? null : <Events />}
      </Layout>
    </>
  )
}
