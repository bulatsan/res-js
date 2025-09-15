import { describe, expect, it } from 'vitest';

import { err, ok } from './res';

describe('res(ok/err)', () => {
  it('ok: wraps value', () => {
    expect(ok(1)).toEqual({ ok: 1 });
  });

  it('err: wraps error', () => {
    expect(err(new Error('error'))).toEqual({ err: new Error('error') });
  });
});
