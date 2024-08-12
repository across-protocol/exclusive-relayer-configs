import { z } from "zod";
import { readdirSync, readFileSync, writeFileSync } from "fs";

import { parseJsonPreprocessor, checksummedEthAddress } from "./utils.js";
import { checksumAddress, isAddress } from "viem";

const projectRoot = process.cwd();

const exclusiveRelayerConfigSchema = z.preprocess(
  parseJsonPreprocessor,
  z.object({
    address: checksummedEthAddress,
  })
);

const shouldMergeAndWrite = process.argv.includes("--merge");

const exclusiveRelayerConfigs = readdirSync(projectRoot + "/configs").map(
  (filename) => {
    try {
      const [addressFromFileName, ext] = filename.split(".");

      if (ext !== "json") {
        throw new Error("Only JSON files are supported.");
      }

      if (!isAddress(addressFromFileName, { strict: true })) {
        throw new Error(
          `Filename has to be a checksummed Ethereum address. Got: ${addressFromFileName}`
        );
      }

      const rawFile = readFileSync(
        projectRoot + `/configs/${filename}`,
        "utf-8"
      );
      const parsedConfig = exclusiveRelayerConfigSchema.parse(rawFile);

      if (parsedConfig.address !== addressFromFileName) {
        throw new Error(
          `Address in filename (${addressFromFileName}) does not match address in config (${parsedConfig.address}).`
        );
      }

      return parsedConfig;
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
    acc[address] = config;
    return acc;
  }, {} as Record<string, z.infer<typeof exclusiveRelayerConfigSchema>>);
  writeFileSync(
    projectRoot + "/build/exclusive-relayer-configs.json",
    JSON.stringify(mergedConfig, null, 2)
  );
  console.log("Successfully merged configs!");
}
