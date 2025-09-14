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
  map,
  mapAsync,
  mapOk,
  mapErr,
  mapOkAsync,
  mapErrAsync,
  type Res,
  type ResAsync,
} from '@bulatlib/res';
```

- `ok<T>(value: T): Res<T, never>`: create a successful result.
- `err<E>(error: E): Res<never, E>`: create an error result.
- `cover<T>(fn: () => T): Res<T, Error>`: run a function and capture thrown values.
- `coverAsync<T>(fn: () => Promise<T>): ResAsync<T, Error>`: async version of `cover`.
- `map(res, { ok?, err? })`: transform `ok` and/or `err` branches.
- `mapOk(res, okHandler)`: transform only the `ok` branch.
- `mapErr(res, errHandler)`: transform only the `err` branch.
- `mapAsync(resPromise, { ok?, err? })`: async version of `map`.
- `mapOkAsync(resPromise, okHandler)`: async version of `mapOk`.
- `mapErrAsync(resPromise, errHandler)`: async version of `mapErr`.

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

Map helpers (sync):

```ts
import { ok, err, map, mapOk, mapErr } from '@bulatlib/res';

const a = map(ok(2), { ok: (n) => n * 2 }); // { ok: 4 }
const b = map(err(new Error('x')), {
  err: (e) => new Error('wrap:' + e.message),
});

const c = mapOk(ok(5), (n) => n + 1); // { ok: 6 }
const d = mapErr(err('oops'), (s) => 'wrapped:' + s); // { err: 'wrapped:oops' }
```

Map helpers (async):

```ts
import { ok, err, mapAsync, mapOkAsync, mapErrAsync } from '@bulatlib/res';

const a = await mapAsync(Promise.resolve(ok(3)), { ok: (n) => n - 1 }); // { ok: 2 }
const b = await mapAsync(Promise.resolve(err('e')), { err: (s) => 'x:' + s }); // { err: 'x:e' }

const c = await mapOkAsync(Promise.resolve(ok(10)), (n) => n * 3); // { ok: 30 }
const d = await mapErrAsync(
  Promise.resolve(err(new Error('z'))),
  (e) => new Error('y:' + e.message),
);
```

Namespace import (optional):

```ts
import { res } from '@bulatlib/res';

const a = res.ok(1);
const b = await res.coverAsync(async () => 2);
const c = res.map(a, { ok: (x) => x + 1 });
```

### Tips

- Use the `'ok' in result` discriminant to narrow types.
- For libraries, prefer returning `Res` instead of throwing exceptions.

### License

MIT
