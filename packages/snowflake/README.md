<div align="center">
    <h1>@sodiumlabs/snowflake</h1>
    <p>
        <a href="https://discord.gg/8PDXWSHH7k"><img src="https://img.shields.io/badge/join_us-on_discord-5865F2?logo=discord&logoColor=white" alt="Discord server" /></a>
        <a href="https://www.npmjs.com/package/@sodiumlabs/snowflake"><img src="https://img.shields.io/npm/v/@sodiumlabs/snowflake.svg?maxAge=3600" alt="npm version" /></a>
        <a href="https://www.npmjs.com/package/@sodiumlabs/snowflake"><img src="https://img.shields.io/npm/dt/@sodiumlabs/snowflake.svg?maxAge=3600" alt="npm downloads" /></a>
        <a href="https://github.com/sodium-labs/utilities/commits/main/packages/snowflake"><img alt="Last commit" src="https://img.shields.io/github/last-commit/sodium-labs/utilities?logo=github&logoColor=ffffff&path=packages%2Fsnowflake" /></a>
    </p>
</div>

## About

Utility package to generate and deconstruct snowflakes. Snowflakes are unique IDs sortable by time and containing their creation timestamp within themselves. Read more about snowflakes on [Wikipedia](https://en.wikipedia.org/wiki/Snowflake_ID).

## Installation

Node.js 18 or newer is required.

```sh
npm install @sodiumlabs/snowflake
```

## Usage

Using snowflakes

```ts
import { Snowflake } from "@sodiumlabs/snowflake";

const epoch = new Date("2020-01-01T00:00:00.000Z");

// Create an instance of Snowflake
const snowflake = new Snowflake(epoch);

// Generate a snowflake with the given epoch
const uniqueId = snowflake.generate();
```

Snowflakes with Discord

```ts
import { discordSnowflake } from "@sodiumlabs/snowflake";

// Extract only the timestamp from a snowflake
const timestamp = discordSnowflake.timestampFrom("716068012414730320");
// 1590794318060

// Deconstruct the snowflake
const data = discordSnowflake.deconstruct("716068012414730320");
// {
//   id: 716068012414730320n,
//   timestamp: 1590794318060n,
//   workerId: 0n,
//   processId: 0n,
//   increment: 80n,
//   epoch: 1420070400000n
// }
```

## Links

- [Documentation](https://docs.sodiumlabs.xyz/docs/packages/snowflake/stable)
- [Discord server](https://discord.gg/8PDXWSHH7k)
- [GitHub](https://github.com/sodium-labs/utilities/tree/main/packages/snowflake)
- [npm](https://npmjs.com/package/@sodiumlabs/snowflake)
- [Sodium Labs](https://sodiumlabs.xyz)

## Help

Need help with the module? Ask on our [support server!](https://discord.gg/8PDXWSHH7k)

## Credits

This project also partially contains code derived or copied from [@sapphire/snowflake](https://github.com/sapphiredev/utilities/tree/main/packages/snowflake).
