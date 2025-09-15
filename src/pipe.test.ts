import { describe, expect, it, vi } from 'vitest';

import { pipe } from './pipe';
import { err, ok } from './res';

describe('pipe', () => {
  const ERROR = new Error('error');
  const OK = ok(1);
  const ERR = err<number>(ERROR);

  describe('map', () => {
    it('[err] map fn -> [err]; fn ignored', () => {
      const fn = vi.fn((_: number) => 2);
      const r = pipe.from(ERR).map(fn).res();

      expect(r).toEqual(ERR);
      expect(fn).not.toHaveBeenCalled();
    });

    it('[ok] map fn[another ok] -> [another ok]', () => {
      const fn = vi.fn((_: number) => 2);
      const r = pipe.from(OK).map(fn).res();

      expect(r).toEqual(ok(2));
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(1);
    });

    it('[ok] map fn[another type ok] -> [another type ok]', () => {
      const fn = vi.fn((_: number) => 'str');
      const r = pipe.from(OK).map(fn).res();

      expect(r).toEqual(ok('str'));
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(1);
    });
  });

  describe('mapErr', () => {
    it('[ok] mapErr fn -> [ok]; fn ignored', () => {
      const wrap = vi.fn((e: Error) => e);
      const r = pipe.from(OK).mapErr(wrap).res();

      expect(r).toEqual(OK);
      expect(wrap).not.toHaveBeenCalled();
    });

    it('[err] mapErr fn[wrapped] -> [wrapped err]', () => {
      const WRAPPED = new Error('wrapped');
      const wrap = vi.fn(() => WRAPPED);
      const r = pipe.from(ERR).mapErr(wrap).res();

      expect(r).toEqual(err(WRAPPED));
      expect(wrap).toHaveBeenCalledTimes(1);
      expect(wrap).toHaveBeenCalledWith(ERROR);
    });
  });

  describe('and', () => {
    it('[ok] and [okX] -> [okX]', () => {
      const X = ok(2);
      const r = pipe.from(OK).and(X).res();

      expect(r).toEqual(X);
    });

    it('[ok] and [errX] -> [errX]', () => {
      const X = err(new Error('x'));
      const r = pipe.from(OK).and(X).res();

      expect(r).toEqual(X);
    });

    it('[err] and [any] -> [err]', () => {
      const X = ok(2);
      const r = pipe.from(ERR).and(X).res();

      expect(r).toEqual(ERR);
    });
  });

  describe('andThen', () => {
    it('[ok] andThen fn(ok)[okX] -> [okX]', () => {
      const fn = vi.fn((_ok: number) => ok(_ok + 1));
      const r = pipe.from(OK).andThen(fn).res();

      expect(r).toEqual(ok(2));
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(1);
    });

    it('[err] andThen fn -> [err]; fn ignored', () => {
      const fn = vi.fn((_ok: number) => ok(_ok + 1));
      const r = pipe.from(ERR).andThen(fn).res();

      expect(r).toEqual(ERR);
      expect(fn).not.toHaveBeenCalled();
    });
  });

  describe('or', () => {
    it('[ok] or [any] -> [ok]', () => {
      const X = err(new Error('x'));
      const r = pipe.from(OK).or(X).res();

      expect(r).toEqual(OK);
    });

    it('[err] or [okX] -> [okX]', () => {
      const X = ok(2);
      const r = pipe.from(ERR).or(X).res();

      expect(r).toEqual(X);
    });
  });

  describe('orElse', () => {
    it('[ok] orElse fn -> [ok]; fn ignored', () => {
      const fn = vi.fn((_e: Error) => ok(2));
      const r = pipe.from(OK).orElse(fn).res();

      expect(r).toEqual(OK);
      expect(fn).not.toHaveBeenCalled();
    });

    it('[err] orElse fn(err)[okX] -> [okX]', () => {
      const fn = vi.fn((_e: Error) => ok(2));
      const r = pipe.from(ERR).orElse(fn).res();

      expect(r).toEqual(ok(2));
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(ERROR);
    });
  });

  describe('unwrapOr', () => {
    it('[ok] unwrapOr default -> ok', () => {
      expect(pipe.from(OK).unwrapOr(10)).toBe(1);
    });

    it('[err] unwrapOr default -> default', () => {
      expect(pipe.from(ERR).unwrapOr(10)).toBe(10);
    });
  });

  describe('unwrapOrElse', () => {
    it('[ok] unwrapOrElse fn -> ok', () => {
      const fn = vi.fn((_e: Error) => 10);
      const r = pipe.from(OK).unwrapOrElse(fn);

      expect(r).toBe(1);
      expect(fn).not.toHaveBeenCalled();
    });

    it('[err] unwrapOrElse fn(err) -> fn(err)', () => {
      const fn = vi.fn((_e: Error) => 10);
      const r = pipe.from(ERR).unwrapOrElse(fn);

      expect(r).toBe(10);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(ERROR);
    });
  });

  describe('match', () => {
    it('[ok] match(okFn, errFn) -> okFn(ok)', () => {
      const okFn = vi.fn((_: number) => `V:${_}`);
      const errFn = vi.fn((e: Error) => `E:${e.message}`);
      const r = pipe.from(OK).match(okFn, errFn);

      expect(r).toBe('V:1');
      expect(okFn).toHaveBeenCalledTimes(1);
      expect(okFn).toHaveBeenCalledWith(1);
      expect(errFn).not.toHaveBeenCalled();
    });

    it('[err] match(okFn, errFn) -> errFn(err)', () => {
      const okFn = vi.fn((_: number) => `V:${_}`);
      const errFn = vi.fn((e: Error) => `E:${e.message}`);
      const r = pipe.from(ERR).match(okFn, errFn);

      expect(r).toBe('E:error');
      expect(errFn).toHaveBeenCalledTimes(1);
      expect(errFn).toHaveBeenCalledWith(ERROR);
      expect(okFn).not.toHaveBeenCalled();
    });
  });

  describe('mapOr', () => {
    it('[ok] mapOr default, fn -> fn(ok)', () => {
      const fn = vi.fn((_: number) => 2);
      const r = pipe.from(OK).mapOr(10, fn).res();

      expect(r).toEqual(ok(2));
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(1);
    });

    it('[err] mapOr default, fn -> default', () => {
      const fn = vi.fn((_: number) => 2);
      const r = pipe.from(ERR).mapOr(10, fn).res();

      expect(r).toEqual(ok(10));
      expect(fn).not.toHaveBeenCalled();
    });
  });

  describe('mapOrElse', () => {
    const DEFAULT = (e: Error) => `E:${e.message}`;
    const MAP = (_: number) => `V:${_}`;

    it('[ok] mapOrElse defaultFn, fn -> fn(ok)', () => {
      const d = vi.fn(DEFAULT);
      const f = vi.fn(MAP);
      const r = pipe.from(OK).mapOrElse(d, f).res();

      expect(r).toEqual(ok('V:1'));
      expect(f).toHaveBeenCalledTimes(1);
      expect(f).toHaveBeenCalledWith(1);
      expect(d).not.toHaveBeenCalled();
    });

    it('[err] mapOrElse defaultFn, fn -> defaultFn(err)', () => {
      const d = vi.fn(DEFAULT);
      const f = vi.fn(MAP);
      const r = pipe.from(ERR).mapOrElse(d, f).res();

      expect(r).toEqual(ok('E:error'));
      expect(d).toHaveBeenCalledTimes(1);
      expect(d).toHaveBeenCalledWith(ERROR);
      expect(f).not.toHaveBeenCalled();
    });
  });

  describe('res', () => {
    it('res() returns the original Res', () => {
      expect(pipe.from(OK).res()).toEqual(OK);
      expect(pipe.from(ERR).res()).toEqual(ERR);
    });
  });

  describe('chaining', () => {
    it('chaining works correctly', () => {
      const v = pipe
        .map(ok(1), (x) => x + 1)
        .and(ok(10))
        .unwrapOr(0);
      expect(v).toBe(10);

      const v2 = pipe
        .orElse(ERR, (_e) => ok(5))
        .map((x) => x * 2)
        .unwrapOr(0);
      expect(v2).toBe(10);
    });
  });
});
