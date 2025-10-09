import { describe, expect, it, vi } from 'vitest';

import { err, ok } from '@/res';

import { mapOrElse } from './map-or-else';

describe('mapOrElse', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  const DEFAULT = (e: Error) => `E:${e.message}`;
  const MAP = (_: number) => `V:${_}`;

  it('[ok] mapOrElse defaultFn, fn -> fn(ok)', () => {
    const d = vi.fn(DEFAULT);
    const f = vi.fn(MAP);
    const r = mapOrElse(OK, d, f);

    expect(r).toEqual(ok('V:1'));
    expect(f).toHaveBeenCalledTimes(1);
    expect(f).toHaveBeenCalledWith(1);
    expect(d).not.toHaveBeenCalled();
  });

  it('[err] mapOrElse defaultFn, fn -> defaultFn(err)', () => {
    const d = vi.fn(DEFAULT);
    const f = vi.fn(MAP);
    const r = mapOrElse(ERR, d, f);

    expect(r).toEqual(ok('E:error'));
    expect(d).toHaveBeenCalledTimes(1);
    expect(d).toHaveBeenCalledWith(new Error('error'));
    expect(f).not.toHaveBeenCalled();
  });
});
