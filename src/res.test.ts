import { describe, expect, it } from 'vitest';
import { ok, err } from './res';

describe('ok', () => {
  it('returns ok result without err field', () => {
    const value = { a: 1 } as const;
    const res = ok(value);

    expect(res).toEqual({ ok: value });
    expect('err' in res).toBe(false);
  });
});

describe('err', () => {
  it('returns error result without ok field', () => {
    const e = new Error('boom');
    const res = err(e);

    expect(res).toEqual({ err: e });
    expect('ok' in res).toBe(false);
  });
});
