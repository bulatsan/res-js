import { describe, expect, it } from 'vitest';

import { err, ok } from '@/res';

import { andAsync } from './and.async';

describe('andAsync', () => {
  const OK = ok(1);
  const OK_2 = ok(2);

  const ERR = err(new Error('error'));
  const ERR_LATE = err(new Error('late error'));

  it('[err] andAsync [another err] -> [err]', async () => {
    expect(await andAsync(ERR, Promise.resolve(ERR_LATE))).toEqual(ERR);
  });

  it('[err] andAsync [ok] -> [err]', async () => {
    expect(await andAsync(ERR, Promise.resolve(OK))).toEqual(ERR);
  });

  it('[ok] andAsync [err] -> [err]', async () => {
    expect(await andAsync(OK, Promise.resolve(ERR))).toEqual(ERR);
  });

  it('[ok] andAsync [another ok] -> [another ok]', async () => {
    expect(await andAsync(OK, Promise.resolve(OK_2))).toEqual(OK_2);
  });

  it('[ok] andAsync [another type ok] -> [another type ok]', async () => {
    expect(await andAsync(OK, Promise.resolve(ok('another type')))).toEqual(
      ok('another type'),
    );
  });
});
