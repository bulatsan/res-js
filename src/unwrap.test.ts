import { describe, expect, it } from 'vitest';

import { err, ok } from './res';
import { unwrap } from './unwrap';

describe('unwrap', () => {
  it('[ok] unwrap -> ok', () => {
    expect(unwrap(ok(1))).toBe(1);
  });

  it('[err] unwrap -> throws(err)', () => {
    const E = new Error('error');
    expect(() => unwrap(err(E))).toThrow(E);
  });
});
