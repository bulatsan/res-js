import { res, type Res } from '@bulatlib/res';

function isOk<T, E>(res: Res<T, E>): res is { ok: T } {
  return (res as any).ok !== undefined;
}

function isErr<T, E>(res: Res<T, E>): res is { err: E } {
  return (res as any).err !== undefined;
}

// Manual construction
const good = res.ok({ id: 1 });
const bad = res.err(new Error('not found'));

if (isOk(good)) console.log('ok:', good.ok);
if (isErr(bad)) console.log('err:', bad.err.message);

// Synchronous cover
const syncOk = res.cover(() => JSON.parse('{"a":1}'));
const syncErr = res.cover(() => JSON.parse('{oops'));

if (isOk(syncOk)) console.log('sync ok a =', syncOk.ok.a);
if (isErr(syncErr)) console.log('sync err =', syncErr.err.message);

// Map helpers (sync)
const mappedA = res.map(res.ok(2), { ok: (n) => n * 2 });
const mappedB = res.map(res.err('e'), { err: (s) => 'x:' + s });
if ('ok' in mappedA) console.log('map ok =', mappedA.ok);
if ('err' in mappedB) console.log('map err =', mappedB.err);

const onlyOk = res.mapOk(res.ok(5), (n) => n + 1);
const onlyErr = res.mapErr(
  res.err(new Error('z')),
  (e) => new Error('y:' + e.message),
);
if ('ok' in onlyOk) console.log('mapOk =', onlyOk.ok);
if (isErr(onlyErr)) console.log('mapErr =', onlyErr.err.message);

// Asynchronous cover + map
async function run() {
  const asyncOk = await res.coverAsync(async () => 7);
  const asyncErr = await res.coverAsync(async () => {
    throw new Error('network down');
  });

  if (isOk(asyncOk)) console.log('async ok =', asyncOk.ok);
  if (isErr(asyncErr)) console.log('async err =', asyncErr.err.message);

  const m1 = await res.mapAsync(Promise.resolve(res.ok(3)), {
    ok: (n) => n - 1,
  });
  const m2 = await res.mapAsync(Promise.resolve(res.err('boom')), {
    err: (s) => 'wrap:' + s,
  });
  if (isOk(m1)) console.log('mapAsync ok =', m1.ok);
  if (isErr(m2)) console.log('mapAsync err =', m2.err);

  const mOk = await res.mapOkAsync(Promise.resolve(res.ok(10)), (n) => n * 3);
  const mErr = await res.mapErrAsync(
    Promise.resolve(res.err(new Error('e'))),
    (e) => new Error('x:' + e.message),
  );
  if (isOk(mOk)) console.log('mapOkAsync =', mOk.ok);
  if (isErr(mErr)) console.log('mapErrAsync =', mErr.err.message);
}

await run();
