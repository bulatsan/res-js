## @bulatlib/res — tiny result helpers for TypeScript

Simple and strict utilities for the Result pattern: `ok`, `err`, `cover`, `coverAsync`, and mapping helpers.

### Install

```bash
npm i @bulatlib/res
# or
pnpm add @bulatlib/res
# or
bun add @bulatlib/res
```

### Usage

```ts
import { res } from '@bulatlib/res';

const { ok, err } = res.cover(() => JSON.parse('{"a":1}'));
if (err) {
  console.log(err); // error branch
} else {
  console.log(ok); // ok branch
}

// Manual result construction
const success = res.ok({ id: 1, name: 'John' });
const failure = res.err(new Error('User not found'));

// Async cover
const result = await res.coverAsync(async () => {
  const response = await fetch('/api/users');
  return response.json();
});
```

### License

MIT
