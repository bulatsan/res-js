import { describe, expect, it } from 'vitest';

import { err, ok } from '@/res';

import { wrap } from './wrap';

describe('wrap', () => {
  it('wrap() returns ok(result) when fn succeeds', () => {
    const r = wrap(() => 42);

    expect(r).toEqual(ok(42));
  });

  it('wrap() returns err(Error) when fn throws Error', () => {
    const E = new Error('boom');
    const r = wrap(() => {
      throw E;
    });

    expect(r).toEqual(err(E));
  });

  it('wrap() converts non-Error throws to Error', () => {
    const r = wrap(() => {
      // eslint-disable-next-line no-throw-literal
      throw 'boom';
    });

    expect(r).toEqual(err(new Error('boom')));
  });
});
