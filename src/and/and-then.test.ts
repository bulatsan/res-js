import { describe, expect, it, vi } from 'vitest';

import { err, ok } from '@/res';

import { andThen } from './and-then';

describe('andThen', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  const MAP_OK = (_: number) => ok(2);
  const MAP_ERR = (_: number) => err(new Error('error'));

  it('[err] andThen fn[ok or err] -> [err]; fn ignored', () => {
    const fn = vi.fn(MAP_OK);
    const r = andThen(ERR, fn);

    expect(r).toEqual(ERR);
    expect(fn).not.toHaveBeenCalled();
  });

  it('[ok] andThen fn[err] -> [err]', () => {
    const fn = vi.fn(MAP_ERR);
    const r = andThen(OK, fn);

    expect(r).toEqual(err(new Error('error')));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it('[ok] andThen fn[another ok] -> [another ok]', () => {
    const fn = vi.fn(MAP_OK);

    const r = andThen(OK, fn);

    expect(r).toEqual(ok(2));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it('[ok] andThen fn[another type ok] -> [another type ok]', () => {
    const fn = vi.fn((_) => ok('another type'));
    const r = andThen(OK, fn);

    expect(r).toEqual(ok('another type'));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });
});
