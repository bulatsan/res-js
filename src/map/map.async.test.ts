import { describe, expect, it, vi } from 'vitest';

import { err, ok } from '@/res';

import { mapAsync } from './map.async';

describe('mapAsync', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  const MAP_TO_2 = async (_: number) => 2;

  it('[err] mapAsync fn -> [err]; fn ignored', async () => {
    const fn = vi.fn(MAP_TO_2);
    const r = await mapAsync(ERR, fn);

    expect(r).toEqual(ERR);
    expect(fn).not.toHaveBeenCalled();
  });

  it('[ok] mapAsync fn[another ok] -> [another ok]', async () => {
    const fn = vi.fn(MAP_TO_2);
    const r = await mapAsync(OK, fn);

    expect(r).toEqual(ok(2));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it('[ok] mapAsync fn[another type ok] -> [another type ok]', async () => {
    const fn = vi.fn(async (_) => 'another type');
    const r = await mapAsync(OK, fn);

    expect(r).toEqual(ok('another type'));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });
});
