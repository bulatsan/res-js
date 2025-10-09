import { describe, expect, it, vi } from 'vitest';

import { err, ok } from '@/res';

import { andThenAsync } from './and-then.async';

describe('andThenAsync', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  const MAP_OK = async (_: number) => ok(2);
  const MAP_ERR = async (_: number) => err(new Error('error'));

  it('[err] andThenAsync fn[ok or err] -> [err]; fn ignored', async () => {
    const fn = vi.fn(MAP_OK);
    const r = await andThenAsync(ERR, fn);

    expect(r).toEqual(ERR);
    expect(fn).not.toHaveBeenCalled();
  });

  it('[ok] andThenAsync fn[err] -> [err]', async () => {
    const fn = vi.fn(MAP_ERR);
    const r = await andThenAsync(OK, fn);

    expect(r).toEqual(err(new Error('error')));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it('[ok] andThenAsync fn[another ok] -> [another ok]', async () => {
    const fn = vi.fn(MAP_OK);

    const r = await andThenAsync(OK, fn);

    expect(r).toEqual(ok(2));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it('[ok] andThenAsync fn[another type ok] -> [another type ok]', async () => {
    const fn = vi.fn(async (_) => ok('another type'));
    const r = await andThenAsync(OK, fn);

    expect(r).toEqual(ok('another type'));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });
});
