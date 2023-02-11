import { utils } from "ethers";

export const encodeTypes = {
  round: [
    "address",
    "address",
    "uint256",
    "uint256",
    "uint256",
    "uint256",
    "address",
    "tuple(uint256 protocol, string pointer)",
    "tuple(uint256 protocol, string pointer)",
    "address[]",
    "address[]",
  ],
};

export function encodeParameters(types: string[], params: any[]) {
  return utils.defaultAbiCoder.encode(types, params);
}
