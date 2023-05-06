import { Grid, GridItem } from "@chakra-ui/react"
import CardSmall from "./CardSmall"
import { useContext, useEffect } from "react"
import { AppContext } from "@/context/AppContext"

export default function EventsGrid () {
    const EVENTS_PER_PAGE = 6
    const { events, initDB, updateEventsList } = useContext(AppContext)

    useEffect(() => {
      if (initDB) {
        updateEventsList(true)
      }
    }, [initDB])
  
    const startIdx = 0
    const endIdx = startIdx + EVENTS_PER_PAGE
    const eventsToShow = events.slice(startIdx, endIdx)

    return (
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
    )
}