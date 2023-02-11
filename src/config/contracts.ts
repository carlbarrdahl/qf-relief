import roundFactory from "abi/roundFactory";
import roundImplementation from "abi/roundImplementation";

import { mainnet, goerli } from "wagmi/chains";

export const contractConfig = {
  RoundImplementation: { abi: roundImplementation, address: "" },
  RoundFactory: {
    abi: roundFactory,
    address: {
      [mainnet.id as number]: "0xe0281a20dFaCb0E179E6581c33542bC533DdC4AB",
      [goerli.id as number]: "0x548c775c4Bd61d873a445ee4E769cf1A18d60eA9",
    },
  },
};

export type ContractNames = keyof typeof contractConfig;
