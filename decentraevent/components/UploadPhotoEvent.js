import { Box, Stack, Text } from "@chakra-ui/react"
import { GoCloudUpload } from "react-icons/go"

export default function UploadPhotoEvent() {
  return (
    <Box borderWidth="1px" p="8px" borderColor="#98A2B3">
      <Stack align="center" justify="center" textAlign="center">
        <GoCloudUpload size="28px" />
        <Text fontSize="16px" fontWeight="500">
          This feature is not yet available
        </Text>
        <Text fontSize="14px">Upload photo for event</Text>
        <Text fontSize="12px">Click to upload or drag and drop</Text>
        <Text fontSize="10px">SVG, PNG, JPG or GIF (max. 800x400px)</Text>
      </Stack>
    </Box>
  )
}
