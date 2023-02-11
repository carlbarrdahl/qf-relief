import { z } from "zod";

export const RoundSchema = z.object({
  title: z.string().min(3),
  website: z
    .string()
    .nullable()
    .or(z.string().url({ message: "Must be a valid URL" })),
  description: z.string().nullable(),
  logoImg: z.string().nullish(), // ipfs hash
  bannerImg: z.string().nullish(), // ipfs hash
  receiver: z
    .string()
    .endsWith(".eth", { message: "Must be a valid address or ENS" })
    .or(z.string().startsWith("0x")), // 0x... or ENS
});
