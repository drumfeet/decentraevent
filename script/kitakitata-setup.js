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
      {
        "==": [{ var: "resource.id" }, { var: "docId" }],
      },
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
      //signer is the original creator of the doc
      {
        "==": [
          { var: "request.auth.signer" },
          { var: "resource.data.user_address" },
        ],
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
    "==": [
      { var: "request.auth.signer" },
      { var: "resource.data.user_address" },
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
  "let create,update": {
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
      {
        "==": [{ var: "resource.id" }, { var: "docId" }],
      },
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
      //signer is the original creator of the doc
      {
        "==": [
          { var: "request.auth.signer" },
          { var: "resource.data.user_address" },
        ],
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
    "==": [
      { var: "request.auth.signer" },
      { var: "resource.data.user_address" },
    ],
  },
}

const schema_rsvp_gated = {
  "let create": {
    nft_balance: {
      var: "request.auth.extra",
    },
    "resource.newData.nft_balance": {
      var: "nft_balance",
    },
  },
  "allow create": {
    and: [
      {
        ">": [
          {
            var: "nft_balance",
          },
          0,
        ],
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
      //signer is the original creator of the doc
      {
        "==": [
          { var: "request.auth.signer" },
          { var: "resource.data.user_address" },
        ],
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
