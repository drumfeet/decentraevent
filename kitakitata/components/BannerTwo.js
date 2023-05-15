import { Box, Text, Heading, Divider } from "@chakra-ui/react"

export default function BannerTwo() {
  return (
    <>
      <Box bgGradient="linear-gradient(135deg, #c4a4e4, #f4c2c2)">
        <Heading
          fontSize="72px"
          fontStyle="italic"
          fontWeight="500"
          color="white"
          py="105px"
          textAlign="center"
        >
          Bring People Together
        </Heading>
      </Box>
    </>
  )
}
