import { describe, expect, it } from 'vitest';
import { mapErr, mapErrAsync, mapOk, mapOkAsync, map, mapAsync } from './map';
import { err, ok } from './res';

describe('mapOk', () => {
  it('transforms ok, leaves err as is', () => {
    const a = mapOk(ok(2), (n) => n + 1);
    const b = mapOk(err(new Error('x')), (n) => n as never);

    expect(a).toEqual({ ok: 3 });
    expect('err' in b).toBe(true);
    if ('err' in b) expect(b.err.message).toBe('x');
  });
});

describe('mapOkAsync', () => {
  it('awaits and transforms ok', async () => {
    const res = await mapOkAsync(Promise.resolve(ok(10)), (n) => n * 2);
    expect(res).toEqual({ ok: 20 });
  });

  it('leaves err unchanged', async () => {
    const res = await mapOkAsync(
      Promise.resolve(err(new Error('bad'))),
      (n) => n as never,
    );
    expect(res).toEqual({ err: new Error('bad') });
  });
});

describe('mapErr', () => {
  it('transforms err, leaves ok as is', () => {
    const a = mapErr(err(new Error('e')), (e) => new Error('x:' + e.message));
    const b = mapErr(ok('ok'), (e) => e);

    expect('err' in a).toBe(true);
    if ('err' in a) expect(a.err.message).toBe('x:e');
    expect(b).toEqual({ ok: 'ok' });
  });
});

describe('mapErrAsync', () => {
  it('awaits and transforms err', async () => {
    const res = await mapErrAsync(
      Promise.resolve(err(new Error('e'))),
      (e) => new Error('y:' + e.message),
    );

    expect('err' in res).toBe(true);
    if ('err' in res) expect(res.err.message).toBe('y:e');
  });

  it('leaves ok unchanged', async () => {
    const res = await mapErrAsync(Promise.resolve(ok('fine')), (e) => e);
    expect(res).toEqual({ ok: 'fine' });
  });
});

describe('map', () => {
  it('applies ok handler and returns transformed ok', () => {
    const initial = ok(2);
    const res2 = map(
      initial,
      (n) => n * 3,
      (e) => e,
    );

    expect(res2).toEqual({ ok: 6 });
  });

  it('applies err handler and returns transformed err', () => {
    const initial = err(new Error('x'));
    const res2 = map(
      initial,
      (n) => n,
      (e) => new Error(e.message + '!'),
    );

    expect('err' in res2).toBe(true);
    if ('err' in res2) expect(res2.err.message).toBe('x!');
  });

  it('returns original when irrelevant handler provided', () => {
    const a = map(
      ok(1),
      (n) => n,
      (e) => e,
    );
    const b = map(
      err(new Error('oops')),
      (n) => n,
      (e) => e,
    );

    expect(a).toEqual({ ok: 1 });
    expect('err' in b).toBe(true);
    if ('err' in b) expect(b.err.message).toBe('oops');
  });
});

describe('mapAsync', () => {
  it('awaits and applies ok handler', async () => {
    const initial = Promise.resolve(ok(5));
    const res2 = await mapAsync(
      initial,
      (n) => n + 1,
      (e) => e,
    );

    expect(res2).toEqual({ ok: 6 });
  });

  it('awaits and applies err handler', async () => {
    const initial = Promise.resolve(err(new Error('boom')));
    const res2 = await mapAsync(
      initial,
      (n) => n,
      (e) => new Error('wrap:' + e.message),
    );

    expect('err' in res2).toBe(true);
    if ('err' in res2) expect(res2.err.message).toBe('wrap:boom');
  });

  it('returns awaited value if no matching handler', async () => {
    const a = await mapAsync(
      Promise.resolve(ok('a')),
      (n) => n,
      (e) => e,
    );
    const b = await mapAsync(
      Promise.resolve(err(new Error('e'))),
      (n) => n,
      (e) => e,
    );

    expect(a).toEqual({ ok: 'a' });
    expect('err' in b).toBe(true);
    if ('err' in b) expect(b.err.message).toBe('e');
  });
});
