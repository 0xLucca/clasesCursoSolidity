export const reviewsABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "MessageUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256",
        name: "number",
        type: "int256",
      },
    ],
    name: "NumberUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "flixer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "rating",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "comment",
        type: "string",
      },
    ],
    name: "ReviewAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_rating",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_comment",
        type: "string",
      },
    ],
    name: "addReview",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getReviews",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "flixer",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "rating",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "comment",
            type: "string",
          },
        ],
        internalType: "struct Reviews.Review[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalReviews",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastReviewed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "readMessage",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "readNumber",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "reviews",
    outputs: [
      {
        internalType: "address",
        name: "flixer",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "rating",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "comment",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_message",
        type: "string",
      },
    ],
    name: "writeMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "_number",
        type: "int256",
      },
    ],
    name: "writeNumber",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
