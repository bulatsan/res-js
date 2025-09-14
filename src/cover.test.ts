import { describe, expect, it } from 'vitest';
import { cover, coverAsync } from './cover';

describe('cover', () => {
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

describe('coverAsync', () => {
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
