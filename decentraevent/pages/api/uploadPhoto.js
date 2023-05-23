import { Storage } from "@google-cloud/storage"

export default async (req, res) => {
  if (req.method === "POST") {
    // const { eventData } = req.body
    let error = null
    let success = false

    try {
      const credentials = {
        client_email: process.env.STORAGE_CLIENT_EMAIL,
        private_key: process.env.STORAGE_PRIVATE_KEY,
      }

      const storage = new Storage({
        credentials: credentials,
      })

      const bucketName = "decentraevent_cover_bucket"
      const bucket = storage.bucket(bucketName)
      const fileName = ""
      const filePath = ""

      // bucket.upload(
      //   filePath,
      //   {
      //     destination: `events/${fileName}`,
      //   },
      //   function (err, file) {
      //     dataTest = file
      //     if (err) {
      //       error = err
      //       console.error(`Error uploading image: ${err}`)
      //     } else {
      //       success = true
      //       console.log(`Image uploaded to ${bucketName}.`)
      //     }
      //   }
      // )
    } catch (e) {
      console.log(e)
      error = "" + e
    } finally {
      res.status(200).json({ success, error })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
