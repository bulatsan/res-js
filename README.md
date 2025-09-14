## @bulatlib/res — tiny result helpers for TypeScript

Simple and strict utilities for the Result pattern: `ok`, `err`, `cover`, and `coverAsync`.

### Install

```bash
npm i @bulatlib/res
# or
pnpm add @bulatlib/res
# or
bun add @bulatlib/res
```

### Quick start

```ts
import { cover } from '@bulatlib/res';

const result = cover(() => JSON.parse('{"a":1}'));

if ('ok' in result) {
  // typed as { a: number }
  console.log(result.ok.a);
} else {
  // typed as Error
  console.error(result.err.message);
}
```

### API

```ts
import {
  ok,
  err,
  cover,
  coverAsync,
  type Res,
  type ResAsync,
} from '@bulatlib/res';
```

- `ok<T>(value: T): Res<T, never>`: create a successful result.
- `err<E>(error: E): Res<never, E>`: create an error result.
- `cover<T>(fn: () => T): Res<T, Error>`: run a function and capture thrown values.
  - Non-Error throws are converted to `Error(String(value))`.
- `coverAsync<T>(fn: () => Promise<T>): ResAsync<T, Error>`: async version of `cover`.

Type definitions:

```ts
type Res<T, E = Error> = { ok: T; err?: never } | { ok?: never; err: E };
type ResAsync<T, E = Error> = Promise<Res<T, E>>;
```

### Examples

Synchronous cover:

```ts
import { cover } from '@bulatlib/res';

const res = cover(() => riskySync());
if ('ok' in res) {
  use(res.ok);
} else {
  handle(res.err);
}
```

Async cover:

```ts
import { coverAsync } from '@bulatlib/res';

const res = await coverAsync(async () => fetchJson(url));
if ('ok' in res) {
  render(res.ok);
} else {
  report(res.err);
}
```

Manual construction:

```ts
import { ok, err } from '@bulatlib/res';

const good = ok({ id: 1 });
const bad = err(new Error('not found'));
```

Namespace import (optional):

```ts
import * as r from '@bulatlib/res';

const a = r.ok(1);
const b = await r.coverAsync(async () => 2);
```

### Tips

- Use the `'ok' in result` discriminant to narrow types.
- For libraries, prefer returning `Res` instead of throwing exceptions.

### License

MIT
