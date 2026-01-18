<div align="center">
    <h1>@sodiumlabs/ms</h1>
    <p>
        <a href="https://discord.gg/8PDXWSHH7k"><img src="https://img.shields.io/badge/join_us-on_discord-5865F2?logo=discord&logoColor=white" alt="Discord server" /></a>
        <a href="https://www.npmjs.com/package/@sodiumlabs/ms"><img src="https://img.shields.io/npm/v/@sodiumlabs/ms.svg?maxAge=3600" alt="npm version" /></a>
        <a href="https://www.npmjs.com/package/@sodiumlabs/ms"><img src="https://img.shields.io/npm/dt/@sodiumlabs/ms.svg?maxAge=3600" alt="npm downloads" /></a>
        <a href="https://github.com/sodium-labs/utilities/commits/main/packages/ms"><img alt="Last commit" src="https://img.shields.io/github/last-commit/sodium-labs/utilities?logo=github&logoColor=ffffff&path=packages%2Fms" /></a>
    </p>
</div>

## About

Use this package to easily convert various time formats to milliseconds.

This package is an enhanced version of [vercel/ms](https://github.com/vercel/ms), with added localization support. With `@sodiumlabs/ms`, you can use multiple units at the same time (e.g. `ms("2h30m45s")`) and define localized units in any language you need.

By default, the following locales are supported: `en`, `fr`, `de`, `es`.

## Installation

Node.js 18 or newer is required.

```sh
npm install @sodiumlabs/ms
```

## Usage

```ts
ms("2 days"); // 172800000
ms("1d"); // 86400000
ms("10h"); // 36000000
ms("2.5 hrs"); // 9000000
ms("2h"); // 7200000
ms("1m"); // 60000
ms("5s"); // 5000
```

Convert from Milliseconds

```ts
ms(60000); // "1m"
ms(2 * 60000); // "2m"
ms(-3 * 60000); // "-3m"
ms(ms("10 hours")); // "10h"
```

Time Format Written-Out

```ts
ms(60000, { long: true }); // "1 minute"
ms(2 * 60000, { long: true }); // "2 minutes"
ms(-3 * 60000, { long: true }); // "-3 minutes"
ms(ms("10 hours"), { long: true }); // "10 hours"
```

Compound Format

```ts
const duration = ms("1min 5s 2ms");

ms(duration); // "1m"
ms(duration, { compound: true }); // "1m5s2ms"
ms(duration, { compound: true, maxUnits: 2 }); // "1m5s"
ms(duration, { long: true, compound: true }); // "1 minute 5 seconds 2 milliseconds"
```

Specific Methods

```ts
// If you only want to parse, you can use
parse("2min");

// If you only want to format, you can use
format(120000);
```

Use another locale

```ts
ms("2h", { locale: "fr", long: true }); // "2 heures"
```

Add a locale

```ts
import { setLocale } from "@sodiumlabs/ms";

// Add the `it` locale
setLocale("it", {
    units: {
        second: {
            short: "s",
            long: c => (c > 1 ? "secondi" : "secondo"),
            names: ["secondi", "secondo", "secs", "sec", "s"],
        },
        minute: {
            short: "m",
            long: c => (c > 1 ? "minuti" : "minuto"),
            names: ["minuti", "minuto", "mins", "min", "m"],
        },
        hour: {
            short: "h",
            long: c => (c > 1 ? "ore" : "ora"),
            names: ["ore", "ora", "h"],
        },
        day: {
            short: "g",
            long: c => (c > 1 ? "giorni" : "giorno"),
            names: ["giorni", "giorno", "g"],
        },
        /// etc.
    },
});
```

## Links

- [Documentation](https://docs.sodiumlabs.xyz/docs/packages/ms/stable)
- [Discord server](https://discord.gg/8PDXWSHH7k)
- [GitHub](https://github.com/sodium-labs/utilities/tree/main/packages/ms)
- [npm](https://npmjs.com/package/@sodiumlabs/ms)
- [Sodium Labs](https://sodiumlabs.xyz)

## Help

Need help with the module? Ask on our [support server!](https://discord.gg/8PDXWSHH7k)
