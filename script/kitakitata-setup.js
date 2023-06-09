const { initSetup, send, getArgv } = require("./utils")
const argv = getArgv("wallet_name", "contractTxId")

const schema_events = {
  type: "object",
  required: [
    "event_id",
    "user_address",
    "date",
    "title",
    "location",
    "start_time",
    "end_time",
  ],
  properties: {
    event_id: {
      type: "string",
    },
    user_address: {
      type: "string",
    },
    date: {
      type: "number",
    },
    title: {
      type: "string",
    },
    organizer: {
      type: "string",
    },
    location: {
      type: "object",
    },
    start_time: {
      type: "number",
    },
    end_time: {
      type: "number",
    },
    event_details: {
      type: "string",
    },
    image_id: {
      type: "string",
    },
    rsvp_limit: {
      type: "number",
    },
    nft_contract: {
      type: "string",
    },
    chain_id: {
      type: "number",
    },
  },
}

const rules_events = {
  "let create,update": {
    docId: [
      "join",
      ":",
      [
        { var: "resource.newData.user_address" },
        { var: "resource.newData.event_id" },
      ],
    ],
  },

  "allow create": {
    and: [
      //validate `resource.id` is a valid `docId` format: `user_address-event_id`
      {
        "==": [{ var: "resource.id" }, { var: "docId" }],
      },
      //validate `user_address` field is the signer
      {
        "==": [
          { var: "request.auth.signer" },
          { var: "resource.newData.user_address" },
        ],
      },
      {
        "==": [
          { var: "request.block.timestamp" },
          { var: "resource.newData.date" },
        ],
      },
    ],
  },

  "allow update": {
    and: [
      //only the original creator of the doc can update their own data
      //signer is the original creator of the doc
      {
        "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
      },
      //user_address field cannot be updated
      {
        "==": [
          { var: "resource.data.user_address" },
          { var: "resource.newData.user_address" },
        ],
      },
      //event_id field cannot be updated
      {
        "==": [
          { var: "resource.data.event_id" },
          { var: "resource.newData.event_id" },
        ],
      },
      {
        "==": [
          { var: "request.block.timestamp" },
          { var: "resource.newData.date" },
        ],
      },
    ],
  },

  "allow delete": {
    or: [
      //original creator of the doc can delete their own data
      {
        "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
      },
      //contract owner can delete documents
      {
        "==": [{ var: "request.auth.signer" }, { var: "contract.owners" }],
      },
    ],
  },
}

const schema_rsvp = {
  type: "object",
  required: [
    "event_doc_id",
    "event_id",
    "event_title",
    "user_address",
    "date",
    "lit",
  ],
  properties: {
    event_doc_id: {
      type: "string",
    },
    event_id: {
      type: "string",
    },
    event_title: {
      type: "string",
    },
    user_address: {
      type: "string",
    },
    date: {
      type: "number",
    },
    lit: {
      encryptedData: { type: "string" },
      encryptedSymmetricKey: { type: "array", items: { type: "number" } },
      evmContractConditions: { type: "object" },
    },
  },
}

const rules_rsvp = {
  "let create": {
    docId: [
      "join",
      "-",
      [
        { var: "resource.newData.user_address" },
        { var: "resource.newData.event_id" },
      ],
    ],
  },

  "allow create": {
    and: [
      //validate `resource.id` is a valid `docId` format: `user_address-event_id`
      {
        "==": [{ var: "resource.id" }, { var: "docId" }],
      },
      //validate `user_address` field is the signer
      {
        "==": [
          { var: "request.auth.signer" },
          { var: "resource.newData.user_address" },
        ],
      },
      {
        "==": [
          { var: "request.block.timestamp" },
          { var: "resource.newData.date" },
        ],
      },
    ],
  },

  "allow update": {
    and: [
      //only the original creator of the doc can update their own data
      //signer is the original creator of the doc
      {
        "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
      },
      //user_address field cannot be updated
      {
        "==": [
          { var: "resource.data.user_address" },
          { var: "resource.newData.user_address" },
        ],
      },
      //event_id field cannot be updated
      {
        "==": [
          { var: "resource.data.event_id" },
          { var: "resource.newData.event_id" },
        ],
      },
      //event_doc_id field cannot be updated
      {
        "==": [
          { var: "resource.data.event_doc_id" },
          { var: "resource.newData.event_doc_id" },
        ],
      },
      {
        "==": [
          { var: "request.block.timestamp" },
          { var: "resource.newData.date" },
        ],
      },
    ],
  },

  "allow delete": {
    or: [
      //original creator of the doc can delete their own data
      {
        "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
      },
      //contract owner can delete documents
      {
        "==": [{ var: "request.auth.signer" }, { var: "contract.owners" }],
      },
    ],
  },
}

const schema_rsvp_gated = {
  type: "object",
  required: [
    "event_doc_id",
    "event_id",
    "event_title",
    "user_address",
    "date",
    "lit",
  ],
  properties: {
    event_doc_id: {
      type: "string",
    },
    event_id: {
      type: "string",
    },
    event_title: {
      type: "string",
    },
    user_address: {
      type: "string",
    },
    date: {
      type: "number",
    },
    nft_balance: {
      type: "number",
    },
    lit: {
      encryptedData: { type: "string" },
      encryptedSymmetricKey: { type: "array", items: { type: "number" } },
      evmContractConditions: { type: "object" },
    },
  },
}

const rules_rsvp_gated = {
  "let create, update": {
    docId: [
      "join",
      "-",
      [
        { var: "resource.newData.user_address" },
        { var: "resource.newData.event_id" },
      ],
    ],
    nft_balance: {
      var: "request.auth.extra",
    },
    "resource.newData.nft_balance": {
      var: "nft_balance",
    },
  },
  "allow create": {
    and: [
      //validate signer wallet address has at least 1 NFT from a specified ERC-721 collection
      {
        ">": [
          {
            var: "nft_balance",
          },
          0,
        ],
      },
      //validate `resource.id` is a valid `docId` format: `user_address-event_id`
      {
        "==": [{ var: "resource.id" }, { var: "docId" }],
      },
      //validate `user_address` field is the signer
      {
        "==": [
          { var: "request.auth.signer" },
          { var: "resource.newData.user_address" },
        ],
      },
      {
        "==": [
          { var: "request.block.timestamp" },
          { var: "resource.newData.date" },
        ],
      },
    ],
  },
  "allow update": {
    and: [
      //only the original creator of the doc can update their own data
      //signer is the original creator of the doc
      {
        "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
      },
      //user_address field cannot be updated
      {
        "==": [
          { var: "resource.data.user_address" },
          { var: "resource.newData.user_address" },
        ],
      },
      //event_id field cannot be updated
      {
        "==": [
          { var: "resource.data.event_id" },
          { var: "resource.newData.event_id" },
        ],
      },
      //event_doc_id field cannot be updated
      {
        "==": [
          { var: "resource.data.event_doc_id" },
          { var: "resource.newData.event_doc_id" },
        ],
      },
      {
        "==": [
          { var: "request.block.timestamp" },
          { var: "resource.newData.date" },
        ],
      },
    ],
  },
  "allow delete": {
    or: [
      //original creator of the doc can delete their own data
      {
        "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
      },
      //contract owner can delete documents
      {
        "==": [{ var: "request.auth.signer" }, { var: "contract.owners" }],
      },
    ],
  },
}

const schema_users = {
  type: "object",
  required: ["user_address", "date", "lit"],
  properties: {
    user_address: {
      type: "string",
    },
    date: {
      type: "number",
    },
    display_name: {
      type: "string",
    },
    lit: {
      encryptedData: { type: "string" },
      encryptedSymmetricKey: { type: "array", items: { type: "number" } },
      evmContractConditions: { type: "object" },
    },
  },
}

const rules_users = {
  "allow create": {
    and: [
      //validate `user_address` field is the signer
      {
        "==": [
          { var: "request.auth.signer" },
          { var: "resource.newData.user_address" },
        ],
      },
      {
        "==": [
          { var: "request.block.timestamp" },
          { var: "resource.newData.date" },
        ],
      },
    ],
  },

  "allow update": {
    and: [
      //only the original creator of the doc can update their own data
      //signer is the original creator of the doc
      {
        "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
      },
      //user_address field cannot be updated
      {
        "==": [
          { var: "resource.data.user_address" },
          { var: "resource.newData.user_address" },
        ],
      },
      {
        "==": [
          { var: "request.block.timestamp" },
          { var: "resource.newData.date" },
        ],
      },
    ],
  },

  "allow delete": {
    or: [
      //original creator of the doc can delete their own data
      {
        "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
      },
      //contract owner can delete documents
      {
        "==": [{ var: "request.auth.signer" }, { var: "contract.owners" }],
      },
    ],
  },
}

const schema_comments = {
  type: "object",
  required: ["comment", "event_id", "user_address", "date"],
  properties: {
    comment: {
      type: "string",
    },
    event_id: {
      type: "string",
    },
    user_address: {
      type: "string",
    },
    date: {
      type: "number",
    },
  },
}

const rules_comments = {
  "allow create": {
    and: [
      //validate `user_address` field is the signer
      {
        "==": [
          { var: "request.auth.signer" },
          { var: "resource.newData.user_address" },
        ],
      },
      {
        "==": [
          { var: "request.block.timestamp" },
          { var: "resource.newData.date" },
        ],
      },
    ],
  },

  "allow update": {
    and: [
      //only the original creator of the doc can update their own data
      //signer is the original creator of the doc
      {
        "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
      },
      //user_address field cannot be updated
      {
        "==": [
          { var: "resource.data.user_address" },
          { var: "resource.newData.user_address" },
        ],
      },
      //event_id field cannot be updated
      {
        "==": [
          { var: "resource.data.event_id" },
          { var: "resource.newData.event_id" },
        ],
      },
      {
        "==": [
          { var: "request.block.timestamp" },
          { var: "resource.newData.date" },
        ],
      },
    ],
  },

  "allow delete": {
    or: [
      //original creator of the doc can delete their own data
      {
        "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
      },
      //contract owner can delete documents
      {
        "==": [{ var: "request.auth.signer" }, { var: "contract.owners" }],
      },
    ],
  },
}

//event_msgs
const schema_messages = {
  type: "object",
  required: ["msg", "event_id", "user_address", "date"],
  properties: {
    msg: {
      type: "string",
    },
    event_id: {
      type: "string",
    },
    user_address: {
      type: "string",
    },
    date: {
      type: "number",
    },
  },
}

//event_msgs
const rules_messages = {
  "allow create": {
    and: [
      //validate `user_address` field is the signer
      {
        "==": [
          { var: "request.auth.signer" },
          { var: "resource.newData.user_address" },
        ],
      },
      {
        "==": [
          { var: "request.block.timestamp" },
          { var: "resource.newData.date" },
        ],
      },
    ],
  },

  "allow update": {
    and: [
      //only the original creator of the doc can update their own data
      //signer is the original creator of the doc
      {
        "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
      },
      //user_address field cannot be updated
      {
        "==": [
          { var: "resource.data.user_address" },
          { var: "resource.newData.user_address" },
        ],
      },
      //event_id field cannot be updated
      {
        "==": [
          { var: "resource.data.event_id" },
          { var: "resource.newData.event_id" },
        ],
      },
      {
        "==": [
          { var: "request.block.timestamp" },
          { var: "resource.newData.date" },
        ],
      },
    ],
  },

  "allow delete": {
    or: [
      //original creator of the doc can delete their own data
      {
        "==": [{ var: "request.auth.signer" }, { var: "resource.setter" }],
      },
      //contract owner can delete documents
      {
        "==": [{ var: "request.auth.signer" }, { var: "contract.owners" }],
      },
    ],
  },
}

const setup = async () => {
  const { sdk, wallet, addr } = await initSetup(argv)

  await send(sdk, wallet, [
    {
      func: "setSchema",
      query: [schema_events, "events"],
      msg: "events schema set!",
    },
    {
      func: "setRules",
      query: [rules_events, "events"],
      msg: "events rules set!",
    },
    {
      func: "setSchema",
      query: [schema_rsvp, "rsvp"],
      msg: "rsvp schema set!",
    },
    {
      func: "setRules",
      query: [rules_rsvp, "rsvp"],
      msg: "rsvp rules set!",
    },
    {
      func: "setSchema",
      query: [schema_users, "users"],
      msg: "users schema set!",
    },
    {
      func: "setRules",
      query: [rules_users, "users"],
      msg: "users rules set!",
    },
  ])
  process.exit()
}

setup()
