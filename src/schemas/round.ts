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

const today = () => Math.floor(Date.now() / 1000);
const ONE_MONTH = 60 * 60 * 24 * 30;

export const RoundSchema = z.object({
  applicationsStartTime: z.number().default(today()),
  applicationsEndTime: z.number().default(today() + ONE_MONTH),
  roundStartTime: z.number().default(today()),
  roundEndTime: z.number().default(today() + ONE_MONTH),
  roundMeta: RoundMetaSchema,
  applicationMeta: ApplicationMetaSchema.default({}),
  adminRoles: z.array(z.string()).default([]),
  roundOperators: z.array(z.string()).default([]),
});
