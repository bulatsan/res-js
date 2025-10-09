import { describe, expect, it } from 'vitest';

import { err, ok } from '@/res';

import { orAsync } from './or.async';

describe('orAsync', () => {
  const OK = ok(1);
  const OK_2 = ok(2);

  const ERR = err(new Error('error'));
  const ERR_LATE = err(new Error('late error'));

  it('[err] orAsync [another err] -> [another err]', async () => {
    expect(await orAsync(ERR, Promise.resolve(ERR_LATE))).toEqual(ERR_LATE);
  });

  it('[err] orAsync [ok] -> [ok]', async () => {
    expect(await orAsync(ERR, Promise.resolve(OK))).toEqual(OK);
  });

  it('[ok] orAsync [err] -> [ok]', async () => {
    expect(await orAsync(OK, Promise.resolve(ERR))).toEqual(OK);
  });

  it('[ok] orAsync [another ok] -> [ok]', async () => {
    expect(await orAsync(OK, Promise.resolve(OK_2))).toEqual(OK);
  });
});
