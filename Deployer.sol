// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts/proxy/Clones.sol";

/* 
Simple deployer contract to deploy any contract.

MerklePayoutContract has no factory in Allo. 
This contract is a work-around to clone another contract with `Deployer.create(payoutContractAddress)`

Deployed to Goerli at: 0x018165aa03fab53c1337fe87d0e09680b303312b

*/
contract Deployer {
    event Deployed(address contractAddress);

    function create(address contractAddress) external returns (address) {
        address clone = Clones.clone(contractAddress);
        emit Deployed(clone);

        return clone;
    }
}
