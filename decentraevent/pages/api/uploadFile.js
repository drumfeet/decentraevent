import Bundlr from "@bundlr-network/client"

export default async (req, res) => {
  if (req.method === "POST") {
    const body = JSON.parse(req.body)
    const bufferData = Buffer.from(body.bufferData, "base64")

    try {
      const bundlr = new Bundlr(
        "http://node1.bundlr.network",
        "matic",
        process.env.MATIC_PRIVAYEKEY
        // "arweave",
        // JSON.parse(process.env.AR_PRIVAYEKEY)
      )

      const bundlrTx = await bundlr.upload(bufferData, {
        tags: [{ name: "Content-Type", value: "image/png" }],
      })

      const success = !!bundlrTx
      res.status(200).json({
        success,
        tx: bundlrTx,
      })
    } catch (e) {
      const error = "Error uploading file! " + e
      console.log(error)
      res.status(500).json({ error })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
