import { describe, expect, it } from 'vitest';
import {
  ok,
  err,
  cover,
  coverAsync,
  map,
  mapAsync,
  mapOk,
  mapErr,
  mapOkAsync,
  mapErrAsync,
} from './res';

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

describe('map', () => {
  it('applies ok handler and returns transformed ok', () => {
    const initial = ok(2);
    const res2 = map(initial, { ok: (n) => n * 3 });

    expect(res2).toEqual({ ok: 6 });
  });

  it('applies err handler and returns transformed err', () => {
    const initial = err(new Error('x'));
    const res2 = map(initial, { err: (e) => new Error(e.message + '!') });

    expect('err' in res2).toBe(true);
    if ('err' in res2) expect(res2.err.message).toBe('x!');
  });

  it('returns original when irrelevant handler provided', () => {
    const a = map(ok(1), { err: (e) => e });
    const b = map(err('oops'), { ok: (n) => n });

    expect(a).toEqual({ ok: 1 });
    expect(b).toEqual({ err: 'oops' });
  });
});

describe('mapAsync', () => {
  it('awaits and applies ok handler', async () => {
    const initial = Promise.resolve(ok(5));
    const res2 = await mapAsync(initial, { ok: (n) => n + 1 });

    expect(res2).toEqual({ ok: 6 });
  });

  it('awaits and applies err handler', async () => {
    const initial = Promise.resolve(err(new Error('boom')));
    const res2 = await mapAsync(initial, {
      err: (e) => new Error('wrap:' + e.message),
    });

    expect('err' in res2).toBe(true);
    if ('err' in res2) expect(res2.err.message).toBe('wrap:boom');
  });

  it('returns awaited value if no matching handler', async () => {
    const a = await mapAsync(Promise.resolve(ok('a')), { err: (e) => e });
    const b = await mapAsync(Promise.resolve(err('e')), {
      ok: (_: never) => 'IGNORED',
    });

    expect(a).toEqual({ ok: 'a' });
    expect(b).toEqual({ err: 'e' });
  });
});

describe('mapOk / mapErr', () => {
  it('mapOk transforms ok, leaves err as is', () => {
    const a = mapOk(ok(2), (n) => n + 1);
    const b = mapOk(err('x'), (n) => n as never);

    expect(a).toEqual({ ok: 3 });
    expect(b).toEqual({ err: 'x' });
  });

  it('mapErr transforms err, leaves ok as is', () => {
    const a = mapErr(err(new Error('e')), (e) => new Error('x:' + e.message));
    const b = mapErr(ok('ok'), (e) => e);

    expect('err' in a).toBe(true);
    if ('err' in a) expect(a.err.message).toBe('x:e');
    expect(b).toEqual({ ok: 'ok' });
  });
});

describe('mapOkAsync / mapErrAsync', () => {
  it('mapOkAsync awaits and transforms ok', async () => {
    const res = await mapOkAsync(Promise.resolve(ok(10)), (n) => n * 2);
    expect(res).toEqual({ ok: 20 });
  });

  it('mapOkAsync leaves err unchanged', async () => {
    const res = await mapOkAsync(
      Promise.resolve(err('bad')),
      (n) => n as never,
    );
    expect(res).toEqual({ err: 'bad' });
  });

  it('mapErrAsync awaits and transforms err', async () => {
    const res = await mapErrAsync(
      Promise.resolve(err(new Error('e'))),
      (e) => new Error('y:' + e.message),
    );

    expect('err' in res).toBe(true);
    if ('err' in res) expect(res.err.message).toBe('y:e');
  });

  it('mapErrAsync leaves ok unchanged', async () => {
    const res = await mapErrAsync(Promise.resolve(ok('fine')), (e) => e);
    expect(res).toEqual({ ok: 'fine' });
  });
});
