import { useNetwork } from "wagmi";
import { contractConfig, ContractNames } from "config/contracts";

type address = `0x${string}`;

type ReturnType = { abi: string[]; address: address };
export const useContractConfig = (name: ContractNames) => {
  const { chain } = useNetwork();

  if (chain?.id) {
    const {
      abi,
      address: { [chain.id]: address },
    } = contractConfig[name];

    console.log(address, abi);
    return { abi, address } as ReturnType;
  }

  return {} as ReturnType;
};
