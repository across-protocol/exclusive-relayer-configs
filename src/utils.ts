import { isAddress } from "viem";
import { z, ZodIssueCode } from "zod";

export function parseJsonPreprocessor(value: any, ctx: z.RefinementCtx) {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (e) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: (e as Error).message,
      });
    }
  }

  return value;
}

export const checksummedEthAddress = z.string().refine((val) => {
  return isAddress(val, { strict: true });
}, "Not a valid checksummed Ethereum address");
