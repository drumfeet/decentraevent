export default async (req, res) => {
  if (req.method === "POST") {
    const { data, eventData } = req.body
    let error = null
    let success = false

    try {
      success = true
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
