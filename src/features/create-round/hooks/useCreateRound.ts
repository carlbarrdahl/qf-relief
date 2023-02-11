import { useMutation } from "@tanstack/react-query";
import { useContractWrite, useWaitForTransaction } from "wagmi";

import { useContractConfig } from "../../../hooks/useContractConfig";
import { encodeParameters, encodeTypes } from "utils/encodeParameters";
import { useEffect } from "react";
import { ipfsUpload } from "utils/ipfs";
import { z } from "zod";
import { RoundSchema } from "schemas/round";

export const protocols = { ipfs: 1 };

export const useCreateRound = ({
  onSuccess,
}: {
  onSuccess?({ address }: { address: string }): void;
}) => {
  const { abi, address } = useContractConfig("RoundFactory");
  const { data, write } = useContractWrite({
    address,
    abi,
    functionName: "create",
    mode: "recklesslyUnprepared",
  });

  const tx = useWaitForTransaction({
    hash: data?.hash,
    enabled: Boolean(data?.hash),
  });

  useEffect(() => {
    if (tx.data) {
      // Get address created Round and redirect
      const address = "tx.data";
      onSuccess?.({ address });
    }
  }, [tx.data]);

  return useMutation(async (round: z.infer<typeof RoundSchema>) => {
    console.log("Round", round);

    return Promise.all([
      ipfsUpload(round.roundMeta),
      ipfsUpload(round.applicationMeta),
    ]).then(([roundMetaCid, applicationMetaCid]) => {
      console.log("Uploaded", roundMetaCid, applicationMetaCid);
      const params = encodeParameters(
        encodeTypes.round,
        Object.values({
          votingStrategy: round.votingStrategy,
          payoutStrategy: round.payoutStrategy,
          applicationsStartTime: round.applicationsStartTime,
          applicationsEndTime: round.applicationsEndTime,
          roundStartTime: round.roundStartTime,
          roundEndTime: round.roundEndTime,
          roundMetaPtr: {
            protocol: protocols.ipfs,
            pointer: roundMetaCid,
          },
          applicationMetaPtr: {
            protocol: protocols.ipfs,
            pointer: applicationMetaCid,
          },
          token: round.token,
          adminRoles: [],
          roundOperators: [],
        })
      );
      console.log("params", params);
      write?.({
        recklesslySetUnpreparedArgs: [params],
      });
    });
  });
};
