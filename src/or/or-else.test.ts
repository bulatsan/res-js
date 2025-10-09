import { describe, expect, it, vi } from 'vitest';

import { err, ok } from '@/res';

import { orElse } from './or-else';

describe('orElse', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  const RECOVER = (_: Error) => ok(2);
  const FAIL = (_: Error) => err(new Error('late error'));

  it('[ok] orElse fn -> [ok]; fn ignored', () => {
    const fn = vi.fn(RECOVER);
    const r = orElse(OK, fn);

    expect(r).toEqual(OK);
    expect(fn).not.toHaveBeenCalled();
  });

  it('[err] orElse fn[ok] -> [ok]', () => {
    const fn = vi.fn(RECOVER);
    const r = orElse(ERR, fn);

    expect(r).toEqual(ok(2));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(new Error('error'));
  });

  it('[err] orElse fn[err] -> [err]', () => {
    const fn = vi.fn(FAIL);
    const r = orElse(ERR, fn);

    expect(r).toEqual(err(new Error('late error')));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(new Error('error'));
  });
});
