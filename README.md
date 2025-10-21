## @bulatlib/res — Rust‑style Result for TypeScript

Small, strict utilities for Rust‑style (`Ok`/`Err`) results. Provides safe constructors, execution wrappers, and transformation chains via `pipe`.

### Install

```bash
npm i @bulatlib/res
# or
pnpm add @bulatlib/res
# or
bun add @bulatlib/res
```

### Quick API

- **Core types**
  - `Res<T>`: union `{ ok: T; err?: never } | { ok?: never; err: Error }`.

- **Constructors**
  - `ok(value)` — create a successful result.
  - `err(error)` — create an error result.

- **Safe execution**
  - `wrap(fn)` — run a sync function with try/catch and return `Res<T>`.
  - `wrapAsync(fn)` — run an async function with try/catch and return `Promise<Res<T>>`.

- **Pipe**
  - `pipe.from(res)` — wraps `Res<T>` and returns `Pipe<T>` with chainable methods.
  - `Pipe<T> methods:`
    - `map(fn)` — `Ok(T) -> Ok(fn(T))`, `Err` unchanged.
    - `mapErr(fn)` — transform `Error` to `Err(fn(err))`.
    - `mapOr(default, fn)` — on `Ok` return `Ok(fn(T))`, on `Err` return `Ok(default)`.
    - `mapOrElse(defaultFn, fn)` — on `Ok` return `Ok(fn(T))`, on `Err` return `Ok(defaultFn(err))`.
    - `and(res)` — if `Ok`, return the second `res`, otherwise keep original `Err`.
    - `andThen(fn)` — if `Ok`, evaluate `fn(T): Res<U>`, otherwise `Err`.
    - `or(res)` — if `Ok`, return it; otherwise return the second `res`.
    - `orElse(fn)` — if `Err`, evaluate `fn(err): Res<T>`; otherwise keep original `Ok`.
    - `unwrapOr(default)` — return `T` or `default`.
    - `unwrapOrElse(fn)` — return `T` or `fn(err)`.
    - `match({ ok, err })` — pattern match and return a value of one of callbacks.
    - `res()` — return raw `Res<T>`.

- **Utilities**
  - `combine(results)` — fold `Res<T>[]` into `Res<T[]>`. Returns the first `Err` if any, otherwise `Ok` with collected values in order.

### Examples

Examples will be added soon. Meanwhile, please check the test files in `src` (e.g., `src/*.test.ts`) for usage examples.

### License

MIT
