import { z } from "zod";

export const roundFormConfig = {
  title: { minLength: 3, maxLength: 20 },
};
export const RoundMetaSchema = z.object({
  title: z
    .string()
    .min(roundFormConfig.title.minLength)
    .max(roundFormConfig.title.maxLength),
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

export const ApplicationMetaSchema = z.object({});

export const RoundSchema = z.object({
  votingStrategy: z.string().default("0x"),
  payoutStrategy: z.string().default("0x"),
  applicationsStartTime: z.string().default(""),
  applicationsEndTime: z.string().default(""),
  roundStartTime: z.string().default(""),
  roundEndTime: z.string().default(""),
  token: z.string().default("0x"),
  roundMeta: RoundMetaSchema,
  applicationMeta: ApplicationMetaSchema.default({}),
  adminRoles: z.array(z.string()).default([]),
  roundOperators: z.array(z.string()).default([]),
});
