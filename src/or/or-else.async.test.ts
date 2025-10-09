import { describe, expect, it, vi } from 'vitest';

import { err, ok } from '@/res';

import { orElseAsync } from './or-else.async';

describe('orElseAsync', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  const RECOVER = async (_: Error) => ok(2);
  const FAIL = async (_: Error) => err(new Error('late error'));

  it('[ok] orElseAsync fn -> [ok]; fn ignored', async () => {
    const fn = vi.fn(RECOVER);
    const r = await orElseAsync(OK, fn);

    expect(r).toEqual(OK);
    expect(fn).not.toHaveBeenCalled();
  });

  it('[err] orElseAsync fn[ok] -> [ok]', async () => {
    const fn = vi.fn(RECOVER);
    const r = await orElseAsync(ERR, fn);

    expect(r).toEqual(ok(2));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(new Error('error'));
  });

  it('[err] orElseAsync fn[err] -> [err]', async () => {
    const fn = vi.fn(FAIL);
    const r = await orElseAsync(ERR, fn);

    expect(r).toEqual(err(new Error('late error')));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(new Error('error'));
  });
});
