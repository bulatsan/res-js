import { describe, expect, it } from 'vitest';

import { err, ok } from './res';
import { unwrap } from './unwrap';

describe('unwrap', () => {
  it('[ok] unwrap -> value', () => {
    expect(unwrap(ok(1))).toEqual(1);
  });

  it('[err] unwrap -> throws', () => {
    expect(() => unwrap(err(new Error('error')))).toThrowError(
      new Error('error'),
    );
  });
});
