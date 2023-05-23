export default async (req, res) => {
  if (req.method === "POST") {
    const { acceptedFile, eventData } = req.body
    let error = null
    let success = false
    let tx = null

    try {
      success = true
    } catch (e) {
      console.log(e)
      error = "" + e
    } finally {
      res.status(200).json({ success, error, tx: acceptedFile })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
