import { describe, expect, it, vi } from 'vitest';

import { mapOr } from './map-or';
import { err, ok } from './res';

describe('mapOr', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  const DEFAULT = 10;
  const MAP_TO_2 = (_: number) => 2;

  it('[ok] mapOr default, fn -> fn(ok)', () => {
    const fn = vi.fn(MAP_TO_2);
    const r = mapOr(OK, DEFAULT, fn).res();

    expect(r).toEqual(ok(2));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });

  it('[err] mapOr default, fn -> default', () => {
    const fn = vi.fn(MAP_TO_2);
    const r = mapOr(ERR, DEFAULT, fn).res();

    expect(r).toEqual(ok(DEFAULT));
    expect(fn).not.toHaveBeenCalled();
  });
});
