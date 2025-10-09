import { describe, expect, it, vi } from 'vitest';

import { err, ok } from '@/res';

import { map } from './map';

describe('map', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  const MAP_TO_2 = (_: number) => 2;

  it('[err] map fn -> [err]; fn ignored', () => {
    const fn = vi.fn(MAP_TO_2);
    const r = map(ERR, fn);

    expect(r).toEqual(ERR);
    expect(fn).not.toHaveBeenCalled();
  });

  it('[ok] map fn[another ok] -> [another ok]', () => {
    const fn = vi.fn(MAP_TO_2);
    const r = map(OK, fn);

    expect(r).toEqual(ok(2));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it('[ok] map fn[another type ok] -> [another type ok]', () => {
    const fn = vi.fn((_) => 'another type');
    const r = map(OK, fn);

    expect(r).toEqual(ok('another type'));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });
});
