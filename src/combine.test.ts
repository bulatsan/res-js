import { describe, expect, it } from 'vitest';

import { combine } from './combine';
import { err, ok } from './res';

describe('combine', () => {
  it('[] -> [ok []]', () => {
    const r = combine([]);

    expect(r).toEqual(ok([]));
  });

  it('[ok, ok, ok] -> [ok [values]]', () => {
    const r = combine([ok(1), ok(2), ok(3)]);

    expect(r).toEqual(ok([1, 2, 3]));
  });

  it('[err, ok, ok] -> [err]', () => {
    const ERROR = new Error('e1');
    const ERR = err<number>(ERROR);
    const r = combine([ERR, ok(2), ok(3)]);

    expect(r).toEqual(ERR);
  });

  it('[ok, err, ok] -> [err]', () => {
    const ERROR = new Error('e2');
    const ERR = err<number>(ERROR);
    const r = combine([ok(1), ERR, ok(3)]);

    expect(r).toEqual(ERR);
  });

  it('[ok, ok, err] -> [err]', () => {
    const ERROR = new Error('e3');
    const ERR = err<number>(ERROR);
    const r = combine([ok(1), ok(2), ERR]);

    expect(r).toEqual(ERR);
  });
});
