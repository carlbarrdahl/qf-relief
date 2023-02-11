import roundFactory from "abi/roundFactory";
import roundImplementation from "abi/roundImplementation";

import { mainnet, goerli } from "wagmi/chains";

export const contractConfig = {
  RoundImplementation: { abi: roundImplementation, address: "" },
  RoundFactory: {
    abi: roundFactory,
    address: {
      [mainnet.id as number]: "0xe0281a20dFaCb0E179E6581c33542bC533DdC4AB",
      [goerli.id as number]: "0x5770b7a57BD252FC4bB28c9a70C9572aE6400E48",
    },
  },
  QFVotingContract: {
    abi: [],
    address: {
      [goerli.id as number]: "0xBF539cD4024Ab2140aA864ba2C6A430201b19318",
    },
  },
  MerklePayoutContract: {
    abi: [],
    address: {
      [goerli.id as number]: "0xEC041ea461a59B355671CC1F87c904519375A6FD",
    },
  },
  USDCToken: {
    abi: [],
    address: {
      [goerli.id as number]: "0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557",
    },
  },
  Deployer: {
    abi: [
      "function create(address contractAddress) external returns (address)",
    ],
    address: {
      [goerli.id as number]: "0x018165aa03fab53c1337fe87d0e09680b303312b",
    },
  },
};

export type ContractNames = keyof typeof contractConfig;
