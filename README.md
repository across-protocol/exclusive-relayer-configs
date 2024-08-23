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

- `minExclusivityPeriod`: The minimum time (in seconds) that a relayer will have exclusive fill rights on a deposit.
- `minProfitThreshold`: The minimum profit margin required for a relayer to be eligible for exclusivity.
- `balanceMultiplier`: Scaling factor to apply to the relayer's balance before determinig whether it has sufficient funds to make a fill..
- `maxFillSize`: The maximum USD value of a fill that the relayer requests exclusivity for.

Example:

```json
// 0x123abc123abc.json
{
  "minExclusivityPeriod": 5,
  "minProfitThreshold": 0.00005,
  "balanceMultiplier": 0.25,
  "maxFillSize": 2500
}
```

## 🧪 Validation (optional)

Before submitting your configuration, it's recommended to ensure that the file is correctly formatted by running the validation script. This step is optional but helps catch formatting errors early.

```bash
yarn validate-configs
```
