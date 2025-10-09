import { describe, expect, it, vi } from 'vitest';

import { err, ok } from '@/res';

import { unwrapOrElse } from './unwrap-or-else';

describe('unwrapOrElse', () => {
  const DEFAULT = (_: Error) => 10;

  it('[ok] unwrapOrElse defaultFn -> ok', () => {
    const d = vi.fn(DEFAULT);
    expect(unwrapOrElse(ok(1), d)).toEqual(1);
    expect(d).not.toHaveBeenCalled();
  });

  it('[err] unwrapOrElse defaultFn -> defaultFn(err)', () => {
    const d = vi.fn(DEFAULT);
    expect(unwrapOrElse(err(new Error('error')), d)).toEqual(10);
    expect(d).toHaveBeenCalledTimes(1);
    expect(d).toHaveBeenCalledWith(new Error('error'));
  });
});
