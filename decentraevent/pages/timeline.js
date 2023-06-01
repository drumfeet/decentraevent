import BannerTwo from "@/components/BannerTwo"
import Layout from "@/components/Layout"
import { AppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import { isNil } from "ramda"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

const {
  Container,
  Box,
  Grid,
  Stack,
  GridItem,
  Skeleton,
  Heading,
} = require("@chakra-ui/react")

const Timeline = () => {
  const { db, user, isLoading, setIsLoading } = useContext(AppContext)
  const [timeline, setTimeline] = useState([])
  const router = useRouter()

  const getTimeline = async () => {
    setIsLoading(true)

    try {
      const userWalletAddress = user?.wallet?.toLowerCase()
      const _timeline = await db.cget(
        "rsvp",
        ["user_address", "==", userWalletAddress],
        ["date", "desc"]
      )
      setTimeline(_timeline)
      console.log(_timeline)
    } catch (e) {
      toast(e.message)
      console.error(`getComments() catch: ${e}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCardClick = async (eventTitle, eventId) => {
    await router.push(`/${eventTitle}/${eventId}`)
  }

  useEffect(() => {
    ;(async () => {
      if (!isNil(db)) {
        getTimeline()
      }
    })()
  }, [db])

  return (
    <>
      <Layout>
        <BannerTwo />
        <Container maxW="5xl" marginTop="58px">
          {isLoading ? (
            <Stack>
              <Skeleton minH="50px" />
              <Skeleton minH="50px" />
              <Skeleton minH="50px" />
              <Skeleton minH="50px" />
              <Skeleton minH="50px" />
            </Stack>
          ) : (
            <>
              {timeline.length > 0 ? (
                <Grid
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                  ]}
                  gap={6}
                  justifyItems="center"
                >
                  {timeline.map((eventRsvp) => {
                    const eventTitle = eventRsvp?.data?.event_title
                    const eventId = eventRsvp?.data?.event_id
                    return (
                      <GridItem
                        p="16px"
                        w="100%"
                        maxW="301px"
                        maxH="297px"
                        key={eventRsvp.id}
                        borderWidth="1px"
                        borderColor="#1D2939"
                      >
                        <Box>
                          <Box
                            h="151px"
                            bgGradient="linear-gradient(90deg, #A163B9 0%, #874DA1 14.06%, #593980 27.2%, #413A78 40.39%, #3D5584 52.48%, #426F93 64.13%, #518BA4 74.25%, #5EA6B5 83.04%, #5FAFBB 90.95%, #67B5BC 97.99%)"
                            cursor="pointer"
                            onClick={() => {
                              handleCardClick(eventTitle, eventId)
                            }}
                          />

                          <Stack spacing="8px">
                            <Heading
                              mt="8px"
                              size="md"
                              noOfLines={1}
                              cursor="pointer"
                              onClick={() => {
                                handleCardClick(eventTitle, eventId)
                              }}
                            >
                              {eventTitle}
                            </Heading>
                          </Stack>
                        </Box>
                      </GridItem>
                    )
                  })}
                </Grid>
              ) : (
                <></>
              )}
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}
export default Timeline
