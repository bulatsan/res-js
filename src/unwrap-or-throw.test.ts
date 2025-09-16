import { describe, expect, it } from 'vitest';

import { err, ok } from './res';
import { unwrapOrThrow } from './unwrap-or-throw';

describe('unwrapOrThrow', () => {
  it('[ok] unwrapOrThrow -> ok', () => {
    expect(unwrapOrThrow(ok(1))).toBe(1);
  });

  it('[err] unwrapOrThrow -> throws(err)', () => {
    const E = new Error('error');
    expect(() => unwrapOrThrow(err(E))).toThrow(E);
  });
});
