import { describe, expect, it } from 'vitest';

import { and } from './and';
import { err, ok } from './res';

describe('and', () => {
  const OK = ok(1);
  const OK_2 = ok(2);

  const ERR = err(new Error('error'));
  const ERR_LATE = err(new Error('late error'));

  it('[err] and [another err] -> [err]', () => {
    expect(and(ERR, ERR_LATE)).toEqual(ERR);
  });

  it('[err] and [ok] -> [err]', () => {
    expect(and(ERR, OK)).toEqual(ERR);
  });

  it('[ok] and [err] -> [err]', () => {
    expect(and(OK, ERR)).toEqual(ERR);
  });

  it('[ok] and [another ok] -> [another ok]', () => {
    expect(and(OK, OK_2)).toEqual(OK_2);
  });

  it('[ok] and [another type ok] -> [another type ok]', () => {
    expect(and(OK, ok('another type'))).toEqual(ok('another type'));
  });
});
