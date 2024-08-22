# Exclusive Relayer Configuration Repository

This public repository hosts configuration files for relayer exclusivity within the Across protocol. Relayers can add or update config files that define specific parameters and values used to select exclusive relayers for bridge fills.

**Project Prerequisites**

- nodejs
- yarn

## Installation

1 Clone the repo

```bash
git clone https://github.com/your-username/exclusive-relayer-config.git
cd exclusive-relayer-config
```

2 Install packages

```bash
yarn install
```

## Adding a new File

To add a new relayer configuration, you need to create a file inside the `/configs` directory.

## 📝 File Naming

The file must be named in the following format:

- `{{relayer-address}}.json`

## Config File Structure

Each config file must include the following fields:

- `minExclusivityPeriod`: The minimum time (in seconds) that a relayer should remain exclusive before other relayers are allowed to fill.
- `minProfitThreshold`: The minimum profit margin required for a relayer to be eligible for exclusivity.
- `balanceMultiplier`: A factor applied to the relayer's balance, which is used to compute their prioritization during the selection process.
- `maxFillSize`: The maximum size of the bridge fill that the relayer can handle.

Example:

```json
// 0x123abc123abc.json
{
  "minExclusivityPeriod": 12,
  "minProfitThreshold": 0.0001,
  "balanceMultiplier": 0.2,
  "maxFillSize": 12000
}
```

## 🧪 Validation (optional)

Before submitting your configuration, it's recommended to ensure that the file is correctly formatted by running the validation script. This step is optional but helps catch formatting errors early.

```bash
yarn validate-configs
```
