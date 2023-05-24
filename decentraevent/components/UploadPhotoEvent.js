import { AppContext } from "@/context/AppContext"
import { Box, Text } from "@chakra-ui/react"
import { useCallback, useContext, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { GoCloudUpload } from "react-icons/go"
import { toast } from "react-toastify"

export default function UploadPhotoEvent() {
  const { acceptedFile, setAcceptedFile } = useContext(AppContext)

  const onDrop = useCallback((acceptedFiles) => {
    console.log("onDrop() acceptedFiles", acceptedFiles)
    setAcceptedFile(acceptedFiles[0])
  }, [])

  const onDropRejected = useCallback((rejectedFiles) => {
    console.log("onDropRejected() rejectedFiles", rejectedFiles)
    toast(`${rejectedFiles[0].file.name} image file is not accepted`)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024, // Set the maximum file size to 2MB
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/svg+xml": [".svg"],
    },
  })

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Box
          borderWidth="1px"
          p="8px"
          borderColor="#98A2B3"
          _hover={{
            boxShadow: "4px 4px 0px black",
            bg: "white",
          }}
        >
          <GoCloudUpload size="28px" />
          {isDragActive ? (
            <Text fontSize="14px">Drop image file here</Text>
          ) : (
            <Text fontSize="14px">Upload photo for event</Text>
          )}
          <Text fontSize="12px">Click to upload or drag and drop</Text>
          <Text fontSize="10px">SVG, PNG, JPG (max. 800x400px)</Text>
        </Box>
        {acceptedFile && (
          <>
            <Text fontSize="12px" fontWeight="400" mt="4px">
              {acceptedFile.name}
            </Text>
          </>
        )}
      </div>
    </>
  )
}
