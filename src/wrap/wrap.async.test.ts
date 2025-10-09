import { describe, expect, it } from 'vitest';

import { err, ok } from '@/res';

import { wrapAsync } from './wrap.async';

describe('wrapAsync', () => {
  it('wrapAsync() returns ok(result) when fn resolves', async () => {
    const r = await wrapAsync(async () => 7);

    expect(r).toEqual(ok(7));
  });

  it('wrapAsync() returns err(Error) when fn rejects Error', async () => {
    const E = new Error('boom');
    const r = await wrapAsync(async () => {
      throw E;
    });

    expect(r).toEqual(err(E));
  });

  it('wrapAsync() converts non-Error rejections to Error', async () => {
    const r = await wrapAsync(async () => {
      // eslint-disable-next-line no-throw-literal
      throw 'boom';
    });

    expect(r).toEqual(err(new Error('boom')));
  });
});
