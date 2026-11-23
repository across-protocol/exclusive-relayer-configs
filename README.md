# Exclusive Relayer Configuration Repository

> [!IMPORTANT]
> This repository is no longer accepting new relayer addresses; updates to existing configs are still accepted. Relayers are encouraged to migrate to Across V5 instead: see the [Across V5 Auction API docs](https://auction.api.across.to/docs).

This public repository hosts configuration files for relayer exclusivity within the Across protocol. Relayers can update config files that define specific parameters and values used to select exclusive relayers for bridge fills.

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

## Config Files

Each relayer configuration is a file inside the `/configs` directory. New files are no longer accepted.

## 📝 File Naming

The file must be named in the following format:

- `{{relayer-address}}.json`

## Config File Structure

Each config file must include the following fields:

- `minExclusivityPeriod`: The minimum time (in seconds) that a relayer will have exclusive fill rights on a deposit.
- `minProfitThreshold`: The minimum profit margin required for a relayer to be eligible for exclusivity.
- `balanceMultiplier`: Scaling factor to apply to the relayer's balance before determining whether it has sufficient funds to make a fill.
- `maxFillSize`: The maximum USD value of a fill that the relayer requests exclusivity for.
- `originChainIds`: The set of origin chains where the relayer wishes to be considered for exclusivity.

Example:

```json
// 0x123abc123abc.json
{
  "minExclusivityPeriod": 5,
  "minProfitThreshold": 0.00005,
  "balanceMultiplier": 0.25,
  "maxFillSize": 2500,
  "originChainIds": [1, 10, 137, 324, 690, 1135, 8453, 34443, 42161, 59144, 81457, 534352, 7777777]
}
```

## 🧪 Validation (optional)

Before submitting your configuration, it's recommended to ensure that the file is correctly formatted by running the validation script. This step is optional but helps catch formatting errors early.

```bash
yarn validate-configs
```
