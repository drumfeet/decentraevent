import {
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  Stack,
} from "@chakra-ui/react"
import CardSmall from "./CardSmall"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"

export default function EventsGrid({ showPagination = true }) {
  const EVENTS_PER_PAGE = 6
  const { events, initDB, updateEventsList } = useContext(AppContext)
  const [page, setPage] = useState(1)

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(events.length / EVENTS_PER_PAGE))
    )
  }

  const handlePageSelect = (newPage) => {
    setPage(newPage)
  }

  useEffect(() => {
    setPage(1)
  }, [events])

  useEffect(() => {
    if (initDB) {
      updateEventsList(true)
    }
  }, [initDB])

  const numPages = Math.ceil(events.length / EVENTS_PER_PAGE)
  const startIdx = (page - 1) * EVENTS_PER_PAGE
  const endIdx = startIdx + EVENTS_PER_PAGE
  const eventsToShow = events.slice(startIdx, endIdx)

  return (
    <>
      {eventsToShow.length > 0 ? (
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={6}
          justifyItems="center"
        >
          {eventsToShow.map((event) => {
            return (
              <GridItem
                p="16px"
                w="100%"
                maxW="301px"
                maxH="297px"
                key={event.id}
                borderWidth="1px"
                borderColor="#1D2939"
              >
                <CardSmall event={event} />
              </GridItem>
            )
          })}
        </Grid>
      ) : (
        <Stack>
          <Skeleton minH="50px" />
          <Skeleton minH="50px" />
          <Skeleton minH="50px" />
          <Skeleton minH="50px" />
          <Skeleton minH="50px" />
        </Stack>
      )}

      {showPagination && (
        <Flex justifyContent="space-between" alignItems="center" mt="8">
          {numPages > 1 && (
            <HStack spacing={4} width="100%">
              <Button
                leftIcon={<ArrowBackIcon />}
                variant="ghost"
                disabled={page === 1}
                onClick={handlePreviousPage}
                flexShrink="0"
              >
                Previous
              </Button>

              <HStack flexGrow="1" justifyContent="center">
                {[...Array(numPages)].map((_, idx) => {
                  const pageNum = idx + 1
                  const isSelected = pageNum === page

                  return (
                    <Button
                      key={pageNum}
                      variant={isSelected ? "solid" : "ghost"}
                      onClick={() => handlePageSelect(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </HStack>

              <Button
                rightIcon={<ArrowForwardIcon />}
                variant="ghost"
                disabled={page === numPages}
                onClick={handleNextPage}
                marginLeft="auto"
                flexShrink="0"
              >
                Next
              </Button>
            </HStack>
          )}
        </Flex>
      )}
    </>
  )
}
