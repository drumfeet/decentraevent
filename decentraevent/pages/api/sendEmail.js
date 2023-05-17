import sgMail from "@sendgrid/mail"

export default async (req, res) => {
  if (req.method === "POST") {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const { recipient, sender, subject, text, html } = req.body

    const msg = {
      to: recipient,
      from: sender,
      subject: subject,
      text: text,
      html: html,
    }
    try {
      await sgMail.send(msg)
      console.log("Email sent successfully!")
      res.status(200).json({ message: "Email sent successfully!" })
    } catch (error) {
      console.error("Error sending email:", error)
      res.status(500).json({ error: "Error sending email" })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
