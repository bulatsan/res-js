import { describe, expect, it, vi } from 'vitest';

import { err, ok } from '@/res';

import { mapOrElseAsync } from './map-or-else.async';

describe('mapOrElseAsync', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  const DEFAULT = async (e: Error) => `E:${e.message}`;
  const MAP = async (_: number) => `V:${_}`;

  it('[ok] mapOrElseAsync defaultFn, fn -> fn(ok)', async () => {
    const d = vi.fn(DEFAULT);
    const f = vi.fn(MAP);
    const r = await mapOrElseAsync(OK, d, f);

    expect(r).toEqual(ok('V:1'));
    expect(f).toHaveBeenCalledTimes(1);
    expect(f).toHaveBeenCalledWith(1);
    expect(d).not.toHaveBeenCalled();
  });

  it('[err] mapOrElseAsync defaultFn, fn -> defaultFn(err)', async () => {
    const d = vi.fn(DEFAULT);
    const f = vi.fn(MAP);
    const r = await mapOrElseAsync(ERR, d, f);

    expect(r).toEqual(ok('E:error'));
    expect(d).toHaveBeenCalledTimes(1);
    expect(d).toHaveBeenCalledWith(new Error('error'));
    expect(f).not.toHaveBeenCalled();
  });
});
