import sgMail from "@sendgrid/mail"

export default async (req, res) => {
  if (req.method === "POST") {
    const MILLISECONDS = 1000
    function convertUnixTimestampToICal(unixTimestamp) {
      const date = new Date(unixTimestamp * MILLISECONDS)

      // Format the date components as required by iCal
      const year = date.getUTCFullYear()
      const month = String(date.getUTCMonth() + 1).padStart(2, "0") // Month is zero-based, so add 1
      const day = String(date.getUTCDate()).padStart(2, "0")
      const hours = String(date.getUTCHours()).padStart(2, "0")
      const minutes = String(date.getUTCMinutes()).padStart(2, "0")
      const seconds = String(date.getUTCSeconds()).padStart(2, "0")

      const iCalFormattedDate = `${year}${month}${day}T${hours}${minutes}${seconds}Z`

      return iCalFormattedDate
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const { data, metadata } = req.body

    try {
      const startTime = convertUnixTimestampToICal(metadata.data.start_time)
      const endTime = convertUnixTimestampToICal(metadata.data.end_time)
      const organizerFormatted = `ORGANIZER;CN=${metadata.data.organizer}:mailto:${data.sender}}`

      const icsContent = Buffer.from(
        `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${startTime}\nDTEND:${endTime}\nSUMMARY:${metadata.data.title}\n${organizerFormatted}\nLOCATION:${metadata.data.location.name}\nDESCRIPTION:${metadata.data.event_details}\nEND:VEVENT\nEND:VCALENDAR`
      ).toString("base64")

      const icsAttachment = {
        content: icsContent,
        filename: "event.ics",
        type: "text/calendar",
        disposition: "attachment",
      }

      const msg = {
        to: data.recipient,
        from: data.sender,
        subject: data.subject,
        text: data.text,
        attachments: [icsAttachment],
      }

      await sgMail.send(msg)
      console.log("Email invite sent successfully!")
      res.status(200).json({ message: "Email invite sent successfully!" })
    } catch (error) {
      console.error("Error sending email invitation:", error)
      res.status(500).json({ error: "Error sending email invitation" })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
