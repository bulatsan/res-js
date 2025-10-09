import { describe, expect, it, vi } from 'vitest';

import { err, ok } from '@/res';

import { mapOrAsync } from './map-or.async';

describe('mapOrAsync', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  const DEFAULT = 10;
  const MAP_TO_2 = async (_: number) => 2;

  it('[ok] mapOrAsync default, fn -> fn(ok)', async () => {
    const fn = vi.fn(MAP_TO_2);
    const r = await mapOrAsync(OK, DEFAULT, fn);

    expect(r).toEqual(ok(2));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it('[err] mapOrAsync default, fn -> default', async () => {
    const fn = vi.fn(MAP_TO_2);
    const r = await mapOrAsync(ERR, DEFAULT, fn);

    expect(r).toEqual(ok(DEFAULT));
    expect(fn).not.toHaveBeenCalled();
  });
});
