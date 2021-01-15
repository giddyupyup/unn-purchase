import config from '../../config';

//
export const VOLUNTARY_LOCK_ADDRESS = config.address.VOLUNTARY_LOCK_ADDRESS;

export const VOLUNTARY_LOCK_ABI = [
  {
    inputs: [
      {
        internalType: 'contract UnionGovernanceToken',
        name: '_unnToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_interestWallet',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'issuerAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'investedAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'interest',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lockPeriod',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'releaseTime',
        type: 'uint256',
      },
    ],
    name: 'VoluntaryLock',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_lockPeriod',
        type: 'uint256',
      },
    ],
    name: 'calculateReward',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_lockPeriod',
        type: 'uint256',
      },
    ],
    name: 'lockTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unnToken',
    outputs: [
      {
        internalType: 'contract UnionGovernanceToken',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
