import { describe, expect, it, vi } from 'vitest';

import { mapErr } from './map-err';
import { err, ok } from './res';

describe('mapErr', () => {
  const OK = ok(1);
  const ERR = err(new Error('error'));

  const WRAP = (e: Error) => new Error(`wrapped: ${e.message}`);

  it('[ok] mapErr fn -> [ok]; fn ignored', () => {
    const fn = vi.fn(WRAP);
    const r = mapErr(OK, fn).res();

    expect(r).toEqual(OK);
    expect(fn).not.toHaveBeenCalled();
  });

  it('[err] mapErr fn -> [mapped err]', () => {
    const fn = vi.fn(WRAP);
    const r = mapErr(ERR, fn).res();

    expect(r).toEqual(err(new Error('wrapped: error')));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(new Error('error'));
  });
});
