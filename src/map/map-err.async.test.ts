import { describe, expect, it, vi } from 'vitest';

import { err, ok } from '@/res';

import { mapErrAsync } from './map-err.async';

describe('mapErrAsync', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  const WRAP = async (e: Error) => new Error(`wrapped: ${e.message}`);

  it('[ok] mapErrAsync fn -> [ok]; fn ignored', async () => {
    const fn = vi.fn(WRAP);
    const r = await mapErrAsync(OK, fn);

    expect(r).toEqual(OK);
    expect(fn).not.toHaveBeenCalled();
  });

  it('[err] mapErrAsync fn -> [mapped err]', async () => {
    const fn = vi.fn(WRAP);
    const r = await mapErrAsync(ERR, fn);

    expect(r).toEqual(err(new Error('wrapped: error')));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(new Error('error'));
  });
});
