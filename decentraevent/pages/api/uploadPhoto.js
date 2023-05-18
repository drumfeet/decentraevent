import { isNil } from "ramda"

const Bundlr = require("@bundlr-network/client")

export default async (req, res) => {
  const { requestData } = JSON.parse(req.body)
  const bundlr = new Bundlr.default(
    "http://node1.bundlr.network",
    "arweave",
    JSON.parse(process.env.BUNDLR_PRIVATEKEY)
  )

  const fileToUpload = ""
  const tags = [{ name: "Content-Type", value: "image/png" }]
  let error = null
  let success = false
  let bundlr_tx = null

  try {
    bundlr_tx = await bundlr.uploadFile(fileToUpload, tags)
    if (!isNil(bundlr_tx.id)) {
      success = true
    }
  } catch (e) {
    console.log(e)
    error = "" + e
  }
  res.status(200).json({ success, error, tx: bundlr_tx })
}
