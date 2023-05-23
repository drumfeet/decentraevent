import Bundlr from "@bundlr-network/client"

export default async function handler(req, res) {
  if (req.method === "POST") {
    let error = null
    let success = false
    let bundlrTx = null
    const buffer = await Buffer.from(req.body)

    try {
      const bundlr = new Bundlr(
        "http://node1.bundlr.network",
        "arweave",
        JSON.parse(process.env.AR_PRIVATEKEY)
      )

      txBundlr = await bundlr.upload(buffer, {
        tags: [{ name: "Content-Type", value: "image/png" }],
      })
    } catch (e) {
      console.log(e)
      error = "" + e
    } finally {
      res.status(200).json({
        success,
        error,
        tx: bundlrTx,
      })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
