import { describe, expect, it } from 'vitest';

import { or } from './or';
import { err, ok } from './res';

describe('or', () => {
  const OK = ok(1);
  const OK_2 = ok(2);
  const ERR = err(new Error('error'));
  const ERR_LATE = err(new Error('late error'));

  it('[err] or [another err] -> [another err]', () => {
    expect(or(ERR, ERR_LATE)).toEqual(ERR_LATE);
  });

  it('[err] or [ok] -> [ok]', () => {
    expect(or(ERR, OK)).toEqual(OK);
  });

  it('[ok] or [err] -> [ok]', () => {
    expect(or(OK, ERR)).toEqual(OK);
  });

  it('[ok] or [another ok] -> [ok]', () => {
    expect(or(OK, OK_2)).toEqual(OK);
  });
});
