import { useMutation } from "@tanstack/react-query";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { useContractConfig } from "../../../hooks/useContractConfig";
import { encodeParameters, encodeTypes } from "utils/encodeParameters";
import { useEffect } from "react";
import { ipfsUpload } from "utils/ipfs";
import { z } from "zod";
import { RoundSchema } from "schemas/round";
import { ethers } from "ethers";

export const protocols = { ipfs: 1 };

type Callbacks = { onSuccess?({ address }: { address: string }): void };

const parseEventArgs = (
  { logs }: ethers.providers.TransactionReceipt,
  abi: string[]
) => {
  const iface = new ethers.utils.Interface(abi);
  return logs.map(iface.parseLog).map((log) => log.args);
};

export const useDeployPayout = ({ onSuccess }: Callbacks) => {
  return;
};
export const useCreateRound = ({ onSuccess }: Callbacks) => {
  const account = useAccount();
  const factory = useContractConfig("RoundFactory");
  const { address: votingStrategy } = useContractConfig("QFVotingContract");
  const { address: token } = useContractConfig("USDCToken");

  const create = useContractWrite({
    address: factory.address,
    abi: factory.abi,
    functionName: "create",
    mode: "recklesslyUnprepared",
  });

  const payout = useDeployPayout({ onSuccess: (deployed) => {} });

  const tx = useWaitForTransaction({
    hash: create.data?.hash,
    enabled: Boolean(create.data?.hash),
  });

  useEffect(() => {
    if (tx.data) {
      console.log("tx.data", tx.data);
      // Get address created Round and redirect
      const address = "tx.data";
      // onSuccess?.({ address });
    }
  }, [tx.data]);

  return useMutation(async (round: z.infer<typeof RoundSchema>) => {
    console.log("Deploy payout", payout);

    console.log("Round", round);
    console.log("Voting", votingStrategy);
    console.log("Account", account);

    return Promise.all([
      ipfsUpload(round.roundMeta),
      ipfsUpload(round.applicationMeta),
    ]).then(([roundMetaCid, applicationMetaCid]) => {
      console.log("Metadata uploaded", roundMetaCid, applicationMetaCid);
      const params = encodeParameters(
        encodeTypes.round,
        Object.values({
          // Order matters
          votingStrategy,
          payoutStrategy: round.payoutStrategy,
          applicationsStartTime: round.applicationsStartTime,
          applicationsEndTime: round.applicationsEndTime,
          roundStartTime: round.roundStartTime,
          roundEndTime: round.roundEndTime,
          token,
          roundMetaPtr: {
            protocol: protocols.ipfs,
            pointer: roundMetaCid,
          },
          applicationMetaPtr: {
            protocol: protocols.ipfs,
            pointer: applicationMetaCid,
          },
          adminRoles: [account.address],
          roundOperators: [account.address],
        })
      );
      console.log("params", params);
      return create.writeAsync?.({
        recklesslySetUnpreparedArgs: [params, account.address],
      });
    });
  });
};
