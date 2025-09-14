import { r } from '@bulatlib/res';

// Manual construction
const good = r.ok({ id: 1 });
const bad = r.err(new Error('not found'));

if (good.ok) console.log('ok:', good.ok);
if (bad.err) console.log('err:', bad.err.message);

// Synchronous cover
const syncOk = r.cover(() => JSON.parse('{"a":1}'));
const syncErr = r.cover(() => JSON.parse('{oops'));

if (syncOk.ok) console.log('sync ok a =', syncOk.ok.a);
if (syncErr.err) console.log('sync err =', syncErr.err.message);

// Asynchronous cover
async function run() {
  const asyncOk = await r.coverAsync(async () => 7);
  const asyncErr = await r.coverAsync(async () => {
    // throw a non-Error to demonstrate conversion
    throw new Error('network down');
  });

  if (asyncOk.ok) console.log('async ok =', asyncOk.ok);
  if (asyncErr.err) console.log('async err =', asyncErr.err.message);
}

await run();
