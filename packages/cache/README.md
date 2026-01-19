<div align="center">
    <h1>@sodiumlabs/cache</h1>
    <p>
        <a href="https://discord.gg/8PDXWSHH7k"><img src="https://img.shields.io/badge/join_us-on_discord-5865F2?logo=discord&logoColor=white" alt="Discord server" /></a>
        <a href="https://www.npmjs.com/package/@sodiumlabs/cache"><img src="https://img.shields.io/npm/v/@sodiumlabs/cache.svg?maxAge=3600" alt="npm version" /></a>
        <a href="https://www.npmjs.com/package/@sodiumlabs/cache"><img src="https://img.shields.io/npm/dt/@sodiumlabs/cache.svg?maxAge=3600" alt="npm downloads" /></a>
        <a href="https://github.com/sodium-labs/utilities/commits/main/packages/cache"><img alt="Last commit" src="https://img.shields.io/github/last-commit/sodium-labs/utilities?logo=github&logoColor=ffffff&path=packages%2Fcache" /></a>
    </p>
</div>

## About

A lightweight and performant caching library providing simple TTL-based caches for single values and key-value maps.

## Installation

Node.js 18 or newer is required.

```sh
npm install @sodiumlabs/cache
```

## Usage

Cache

```ts
import { Cache } from "@sodiumlabs/cache";

// values are cached for 60s:
const cache = new Cache({ ttl: 60_000 });

cache.set("some key", 10);

cache.get("some key"); // 10
cache.has("some key"); // true
cache.set("some key", 10, 10_000); // override the default TTL with 10s

await sleep(11_000);

cache.has("some key"); // false
```

ValueCache

```ts
import { ValueCache } from "@sodiumlabs/cache";

const value = new ValueCache({ ttl: 10_000 }).set("some value");

value.get(); // "some value"

await sleep(11_000);

value.get(); // undefined
```

## Links

- [Documentation](https://docs.sodiumlabs.xyz/docs/packages/cache/stable)
- [Discord server](https://discord.gg/8PDXWSHH7k)
- [GitHub](https://github.com/sodium-labs/utilities/tree/main/packages/cache)
- [npm](https://npmjs.com/package/@sodiumlabs/cache)
- [Sodium Labs](https://sodiumlabs.xyz)

## Help

Need help with the module? Ask on our [support server!](https://discord.gg/8PDXWSHH7k)
