# Exclusive Relayer Configurations

To add a new relayer configuration, you need to create a file inside the `/configs` directory.

## 📝 File Naming

The file must be named in the following format:

- `{{relayer-address}}.json`

Example:

```json
// 0x123abc123abc.json
{
  "minExclusivePeriod": 12, // number (seconds)
  "minProfitThreshold": 0.0001, // number
  "balanceMultiplier": 0.2, // number
  "maxFillSize": 12000 // number
}
```

## 🧪 Validation

Before submitting your configuration, ensure that the file is correctly formatted by running the validation script:

```bash
yarn validate-configs
```
