import { describe, expect, it } from 'vitest';
import { ok, err, cover, coverAsync } from './res';

describe('r.ok', () => {
  it('returns ok result without err field', () => {
    const value = { a: 1 } as const;
    const res = ok(value);

    expect(res).toEqual({ ok: value });
    expect('err' in res).toBe(false);
  });
});

describe('r.err', () => {
  it('returns error result without ok field', () => {
    const e = new Error('boom');
    const res = err(e);

    expect(res).toEqual({ err: e });
    expect('ok' in res).toBe(false);
  });
});

describe('r.cover', () => {
  it('wraps successful call into ok', () => {
    const res = cover(() => 42);

    expect(res).toEqual({ ok: 42 });
    expect('err' in res).toBe(false);
  });

  it('wraps failed call into err', () => {
    const e = new Error('boom');
    const res = cover(() => {
      throw e;
    });

    expect(res.err).toBe(e);
    expect('ok' in res).toBe(false);
  });
});

describe('r.coverAsync', () => {
  it('wraps successful async call into ok', async () => {
    const res = await coverAsync(async () => 7);

    expect(res).toEqual({ ok: 7 });
    expect('err' in res).toBe(false);
  });

  it('wraps failed async call into err', async () => {
    const e = new Error('nope');
    const res = await coverAsync(async () => {
      throw e;
    });

    expect(res.err).toBe(e);
    expect('ok' in res).toBe(false);
  });
});
