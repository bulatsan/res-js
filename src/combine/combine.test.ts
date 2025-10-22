import { describe, expect, it } from 'vitest';

import { err, ok } from '@/res';

import { combine } from './combine';

describe('combine', () => {
  it('[] -> [ok []]', () => {
    const r = combine();

    expect(r).toEqual(ok([]));
  });

  it('[ok, ok, ok] -> [ok [values]]', () => {
    const r = combine(ok(1), ok(2), ok(3));

    expect(r).toEqual(ok([1, 2, 3]));
  });

  it('[err, ok, ok] -> [err]', () => {
    const ERROR = new Error('e1');
    const ERR = err(ERROR);
    const r = combine(ERR, ok(2), ok(3));

    expect(r).toEqual(ERR);
  });

  it('[ok, err, ok] -> [err]', () => {
    const ERROR = new Error('e2');
    const ERR = err(ERROR);
    const r = combine(ok(1), ERR, ok(3));

    expect(r).toEqual(ERR);
  });

  it('[ok, ok, err] -> [err]', () => {
    const ERROR = new Error('e3');
    const ERR = err(ERROR);
    const r = combine(ok(1), ok(2), ERR);

    expect(r).toEqual(ERR);
  });

  it('deconstruct ok', () => {
    const [num, str, bool] = combine(ok(1), ok('str'), ok(true)).ok!;

    expect(num).toEqual(1);
    expect(str).toEqual('str');
    expect(bool).toEqual(true);
  });

  // array form
  it('array: [] -> [ok []]', () => {
    const empty: [] = [];
    const r = combine(empty);

    expect(r).toEqual(ok([]));
  });

  it('array: [ok, ok, ok] -> [ok [values]]', () => {
    const list = [ok(1), ok(2), ok(3)] as const;
    const r = combine(list);

    expect(r).toEqual(ok([1, 2, 3]));
  });

  it('array: [err, ok, ok] -> [err]', () => {
    const ERROR = new Error('e4');
    const ERR = err(ERROR);
    const list = [ERR, ok(2), ok(3)] as const;
    const r = combine(list);

    expect(r).toEqual(ERR);
  });

  it('array: [ok, err, ok] -> [err]', () => {
    const ERROR = new Error('e5');
    const ERR = err(ERROR);
    const list = [ok(1), ERR, ok(3)] as const;
    const r = combine(list);

    expect(r).toEqual(ERR);
  });

  it('array: [ok, ok, err] -> [err]', () => {
    const ERROR = new Error('e6');
    const ERR = err(ERROR);
    const list = [ok(1), ok(2), ERR] as const;
    const r = combine(list);

    expect(r).toEqual(ERR);
  });

  it('array: deconstruct ok', () => {
    const list = [ok(1), ok('str'), ok(true)] as const;
    const [num, str, bool] = combine(list).ok!;

    expect(num).toEqual(1);
    expect(str).toEqual('str');
    expect(bool).toEqual(true);
  });
});
