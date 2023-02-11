import { useNetwork } from "wagmi";
import { contractConfig, ContractNames } from "config/contracts";

export const useContractConfig = (name: ContractNames) => {
  const { chain } = useNetwork();

  if (chain?.id) {
    const {
      abi,
      address: { [chain.id]: address },
    } = contractConfig[name];

    console.log(address, abi);
    return { abi, address };
  }
  return {};
};
