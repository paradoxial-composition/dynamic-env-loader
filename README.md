# Dynamic Environment Variable Loader [(Git)](https://github.com/paradoxial-composition/dynamic-env-loader)

A Node.js package that dynamically loads environment variables based on the current environment (e.g., development, staging, production) without requiring manual configuration.

## Features

- Auto-detects the current environment (`NODE_ENV`).
- Supports fallback values if a variable is missing.
- Works seamlessly with frameworks like React and Node.js.

## Installation

```bash
npm install dynamic-env-loader
```

## Usage

```bash
const DynamicEnvLoader = require('dynamic-env-loader');

// Initialize the loader
const envLoader = DynamicEnvLoader.getInstance();

// Get environment variables
const apiKey = envLoader.get('API_KEY', 'fallback_value');
console.log(apiKey);
```

## Example

Assume you have the following `.env` files:

- `.env.development`
- `.env.production`

When `NODE_ENV=development`, the package will automatically load variables from .env.development.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT.
