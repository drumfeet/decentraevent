import WeaveDB from "weavedb-sdk-node"
import * as dotenv from "dotenv"
dotenv.config()

const contractTxId = "plxPveypGZ4g__TaFzQd8D70WtrGAOVIiWAa_wgUi0Y"
const privateKeyArweave = JSON.parse(process.env.AR_PRIVATE_KEY)

const COLLECTION_EVENTS = "events"
const COLLECTION_RSVP = "rsvp"
const COLLECTION_USERS = "users"

const sdk = new WeaveDB({
  contractTxId: contractTxId,
  arweave_wallet: privateKeyArweave,
})
sdk.initialize({ wallet: privateKeyArweave })

let result
try {
  result = await sdk.setSchema(schema_events, COLLECTION_EVENTS)
  console.log("setSchema schema_events", result.success)

  result = await sdk.setRules(rules_events, COLLECTION_EVENTS)
  console.log("setRules rules_events", result.success)

  result = await sdk.setSchema(schema_rsvp, COLLECTION_RSVP)
  console.log("setSchema schema_rsvp", result.success)

  result = await sdk.setRules(rules_rsvp, COLLECTION_RSVP)
  console.log("setRules rules_rsvp", result.success)

  result = await sdk.setSchema(schema_users, COLLECTION_USERS)
  console.log("setSchema schema_users", result.success)

  result = await sdk.setRules(rules_users, COLLECTION_USERS)
  console.log("setRules rules_users", result.success)

  process.exit()
} catch (e) {
  console.log(e)
}
