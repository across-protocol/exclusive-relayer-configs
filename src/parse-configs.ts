import { z } from "zod";
import { readdirSync, readFileSync, writeFileSync } from "fs";

import { parseJsonPreprocessor, checksummedEthAddress } from "./utils.js";
import { checksumAddress } from "viem";

const projectRoot = process.cwd();

const exclusiveRelayerConfigSchema = z.preprocess(
  parseJsonPreprocessor,
  z.object({
    minExclusivityPeriod: z.number(), // (seconds) eg. 10
    minProfitThreshold: z.number(), // eg. 0.0001
    balanceMultiplier: z.number(), // eg. 0.2
    maxFillSize: z.number(), // eg. 10_000
    originChainIds: z.array(z.number), // [1, 10, 137, 324 ...]
  })
);

const shouldMergeAndWrite = process.argv.includes("--merge");

const exclusiveRelayerConfigs = readdirSync(projectRoot + "/configs")
  .filter((filename) => filename.endsWith(".json"))
  .map((filename) => {
    try {
      const [addressFromFileName, ext] = filename.split(".");

      if (ext !== "json") {
        throw new Error("Only JSON files are supported.");
      }

      const parsedAddress =
        checksummedEthAddress.safeParse(addressFromFileName);

      if (!parsedAddress.success) {
        throw new Error(parsedAddress.error.message);
      }

      const rawFile = readFileSync(
        projectRoot + `/configs/${filename}`,
        "utf-8"
      );
      const parsedConfig = exclusiveRelayerConfigSchema.parse(rawFile);

      // use the address from filename
      return { ...parsedConfig, address: parsedAddress.data };
    } catch (e) {
      console.error(`Error parsing ${filename}: ${e.message}`);
      process.exit(1);
    }
  }
);
console.log("All configs are valid.");

if (shouldMergeAndWrite) {
  const mergedConfig = exclusiveRelayerConfigs.reduce((acc, config) => {
    const address = checksumAddress(config.address);
    if (acc[address]) {
      console.error(
        `Duplicate config for address ${config.address}. Please remove one.`
      );
      process.exit(1);
    }
    // remove redundant address
    delete config.address;

    acc[address] = config;
    return acc;
  }, {} as Record<string, z.infer<typeof exclusiveRelayerConfigSchema>>);
  writeFileSync(
    projectRoot + "/build/exclusive-relayer-configs.json",
    JSON.stringify(mergedConfig, null, 2)
  );
  console.log("Successfully merged configs!");
}
